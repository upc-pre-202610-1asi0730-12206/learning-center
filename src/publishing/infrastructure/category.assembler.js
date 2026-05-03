import {Category} from "../domain/model/category.entity.js";

/**
 * Maps Publishing category resources into domain entities.
 *
 * @class CategoryAssembler
 */
export class CategoryAssembler {

    /**
     * @param {{id: number|string, name: string}} resource - Category resource payload.
     * @returns {Category} Category entity.
     */
    static toEntityFromResource(resource) {
        return new Category({...resource});
    }

    /**
     * Parses category resources from a response and maps them into entities.
     *
     * @param {import('axios').AxiosResponse<Array<{id: number|string, name: string}>|{categories:Array<{id: number|string, name: string}>}>} response - HTTP response with category resources.
     * @returns {Category[]} Category entities.
     */
    static toEntitiesFromResponse(response) {
        if (response.status !== 200) {
            console.error(`${response.status} - ${response.statusText}`);
            return [];
        }
        let resources = response.data instanceof Array ? response.data : response.data['categories'];

        return resources.map(resource => this.toEntityFromResource(resource));
    }
}