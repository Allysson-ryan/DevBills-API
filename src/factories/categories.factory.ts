import { CategoriesRepository } from "../database/repositories/categories.repository";
import { CategoryModel } from "../database/schemas/category.schema";
import { CategoriesService } from "../services/categories.services";

export const CategoriesFactory = {
    categoriesService: null as CategoriesService | null,

    getServiceInstance() {
        if (this.categoriesService) {
            return this.categoriesService;
        }

        const repository = new CategoriesRepository(CategoryModel);
        const service = new CategoriesService(repository);

        this.categoriesService = service;

        return service;
    },
};