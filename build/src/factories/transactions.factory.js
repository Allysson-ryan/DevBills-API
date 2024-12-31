"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionFactory = void 0;
const categories_repository_1 = require("../database/repositories/categories.repository");
const transactions_repository_1 = require("../database/repositories/transactions.repository");
const category_schema_1 = require("../database/schemas/category.schema");
const trasnsactions_schema_1 = require("../database/schemas/trasnsactions.schema");
const transactions_service_1 = require("../services/transactions.service");
function createRepositories() {
    const transactionsRepository = new transactions_repository_1.TransactionsRepository(trasnsactions_schema_1.TransactionModel);
    const categoriesRepository = new categories_repository_1.CategoriesRepository(category_schema_1.CategoryModel);
    return { transactionsRepository, categoriesRepository };
}
exports.TransactionFactory = {
    transactionsService: null,
    getServiceInstance() {
        if (!this.transactionsService) {
            const { transactionsRepository, categoriesRepository } = createRepositories();
            this.transactionsService = new transactions_service_1.TransactionsService(transactionsRepository, categoriesRepository);
        }
        return this.transactionsService;
    },
};
