import { CategoriesRepository } from "../database/repositories/categories.repository";
import { TransactionsRepository } from "../database/repositories/transactions.repository";
import { CategoryModel } from "../database/schemas/category.schema";
import { TransactionModel } from "../database/schemas/trasnsactions.schema";
import { TransactionsService } from "../services/transactions.service";

function createRepositories() {
  const transactionsRepository = new TransactionsRepository(TransactionModel);
  const categoriesRepository = new CategoriesRepository(CategoryModel);
  return { transactionsRepository, categoriesRepository };
}

export const TransactionFactory = {
  transactionsService: null as TransactionsService | null,

  getServiceInstance(): TransactionsService {
    if (!this.transactionsService) {
      const { transactionsRepository, categoriesRepository } = createRepositories();
      this.transactionsService = new TransactionsService(transactionsRepository, categoriesRepository);
    }
    return this.transactionsService;
  },
};