import {BaseApi} from "../../shared/infrastructure/base-api.js";
import {BaseEndpoint} from "../../shared/infrastructure/base-endpoint.js";

const categoriesEndpointPath = import.meta.env.VITE_CATEGORIES_ENDPOINT_PATH;
const tutorialsEndpointPath     = import.meta.env.VITE_TUTORIALS_ENDPOINT_PATH;

/**
 * Infrastructure adapter for Publishing HTTP endpoints.
 *
 * @class PublishingApi
 * @extends BaseApi
 */
export class PublishingApi extends BaseApi {
    /** @type {BaseEndpoint} */
    #categoriesEndpoint;
    /** @type {BaseEndpoint} */
    #tutorialsEndpoint;

    /** Creates endpoint clients for categories and tutorials resources. */
    constructor() {
        super();
        this.#categoriesEndpoint = new BaseEndpoint(this, categoriesEndpointPath);
        this.#tutorialsEndpoint = new BaseEndpoint(this, tutorialsEndpointPath);
    }

    /**
     * Retrieves category resources.
     * @returns {Promise<import('axios').AxiosResponse<Array<{id: number|string, name: string}>|{categories:Array<{id: number|string, name: string}>}>>} HTTP response with category resources.
     */
    getCategories() {
        return this.#categoriesEndpoint.getAll();
    }

    /**
     * Retrieves one category resource by identifier.
     * @param {number|string} id - Category identifier.
     * @returns {Promise<import('axios').AxiosResponse<{id: number|string, name: string}>>} HTTP response with the requested category resource.
     */
    getCategoryById(id) {
        return this.#categoriesEndpoint.getById(id);
    }

    /**
     * Persists a new category resource.
     * @param {{id: number|string, name: string}|import('../domain/model/category.entity.js').Category} resource - Category data to persist.
     * @returns {Promise<import('axios').AxiosResponse<{id: number|string, name: string}>>} HTTP response with the created category resource.
     */
    createCategory(resource) {
        return this.#categoriesEndpoint.create(resource);
    }

    /**
     * Updates an existing category resource.
     * @param {{id: number|string, name: string}|import('../domain/model/category.entity.js').Category} resource - Category data including its identifier.
     * @returns {Promise<import('axios').AxiosResponse<{id: number|string, name: string}>>} HTTP response with the updated category resource.
     */
    updateCategory(resource) {
        return this.#categoriesEndpoint.update(resource.id, resource);
    }

    /**
     * Deletes one category resource by identifier.
     * @param {number|string} id - Category identifier.
     * @returns {Promise<import('axios').AxiosResponse<Object>>} HTTP response from delete operation.
     */
    deleteCategory(id) {
        return this.#categoriesEndpoint.delete(id);
    }

    /**
     * Retrieves tutorial resources.
     * @returns {Promise<import('axios').AxiosResponse<Array<{id: number|string, title: string, summary: string, categoryId: number|string|null}>|{tutorials:Array<{id: number|string, title: string, summary: string, categoryId: number|string|null}>}>>} HTTP response with tutorial resources.
     */
    getTutorials() {
        return this.#tutorialsEndpoint.getAll();
    }

    /**
     * Retrieves one tutorial resource by identifier.
     * @param {number|string} id - Tutorial identifier.
     * @returns {Promise<import('axios').AxiosResponse<{id: number|string, title: string, summary: string, categoryId: number|string|null}>>} HTTP response with the requested tutorial resource.
     */
    getTutorialById(id) {
        return this.#tutorialsEndpoint.getById(id);
    }

    /**
     * Persists a new tutorial resource.
     * @param {{id: number|string, title: string, summary: string, categoryId: number|string|null}|import('../domain/model/tutorial.entity.js').Tutorial} resource - Tutorial data to persist.
     * @returns {Promise<import('axios').AxiosResponse<{id: number|string, title: string, summary: string, categoryId: number|string|null}>>} HTTP response with the created tutorial resource.
     */
    createTutorial(resource) {
        return this.#tutorialsEndpoint.create(resource);
    }

    /**
     * Updates an existing tutorial resource.
     * @param {{id: number|string, title: string, summary: string, categoryId: number|string|null}|import('../domain/model/tutorial.entity.js').Tutorial} resource - Tutorial data including its identifier.
     * @returns {Promise<import('axios').AxiosResponse<{id: number|string, title: string, summary: string, categoryId: number|string|null}>>} HTTP response with the updated tutorial resource.
     */
    updateTutorial(resource) {
        return this.#tutorialsEndpoint.update(resource.id, resource);
    }

    /**
     * Deletes one tutorial resource by identifier.
     * @param {number|string} id - Tutorial identifier.
     * @returns {Promise<import('axios').AxiosResponse<Object>>} HTTP response from delete operation.
     */
    deleteTutorial(id) {
        return this.#tutorialsEndpoint.delete(id);
    }
}