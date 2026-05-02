import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {CategoryAssembler} from "../infrastructure/category.assembler.js";

const publishingApi = new publishingApi();

const usePublishingStore = defineStore('publishing', () => {
    // state
    const categories = ref([]);
    const errors = ref([]);
    const categoriesLoaded = ref(false);

    // getters
    const categoriesCount = computed(
        () => categoriesLoaded ? categories.value.length : 0);

    // actions

    function fetchCategories() {
        publishingApi.getCategories().then(response => {
            categories.value = CategoryAssembler.toEntitiesFromResponse(response);
            categoriesLoaded.value = true;
            console.log(categories.value);
            console.log(categoriesLoaded.value);
        }).catch(error => {
            errors.value.push(error);
        });
    }

    function getCategoryById(id) {
        let idNum = parseInt(id);
        return categories.value.find(category => category['id'] === idNum);
    }

    function addCategory(category) {
        publishingApi.createCategory(category).then(response => {
            const resource = response.data;
            const newCategory = CategoryAssembler.toEntityFromResource(resource);
            categories.value.push(newCategory);
        }).catch(error => {
            errors.value.push(error);
        });
    }

    function updateCategory(category) {
        publishingApi.updateCategory(category).then(response => {
            const resource = response.data;
            const updatedCategory = CategoryAssembler.toEntityFromResource(resource);
            const index = categories.value.findIndex(c => c['id'] === updatedCategory.id);
            if (index !== -1) categories.value[index] = updatedCategory;
        }).catch(error => {
            errors.value.push(error);
        });
    }

    function deleteCategory(id) {
        publishingApi.deleteCategory(id).then(response => {
            const index = categories.value.findIndex(c => c['id'] === id);
            if (index !== -1) categories.value.splice(index, 1);
        }).catch(error => {
            errors.value.push(error);
        });
    }

    return {
        categories,
        errors,
        categoriesLoaded,
        categoriesCount,
        fetchCategories,
        getCategoryById,
        addCategory,
        updateCategory,
        deleteCategory
    }
});

export default usePublishingStore;