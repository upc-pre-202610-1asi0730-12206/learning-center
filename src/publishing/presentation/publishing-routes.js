const categoryList = () => import('./views/category-list.vue');
const categoryForm = () => import('./views/category-form.vue');

const publishingRoutes = [
    { path: 'categories',           name: 'publishing-categories',      component: categoryList, meta: { title: 'Categories' } },
    { path: 'categories/new',       name: 'publishing-category-new',    component: categoryForm, meta: { title: 'New Category' } },
    { path: 'categories/:id/edit',  name: 'publishing-category-edit',   component: categoryForm, meta: { title: 'Edit Category' }}
];

export default publishingRoutes;