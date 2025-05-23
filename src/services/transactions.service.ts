import { StatusCodes } from "http-status-codes";
import type { TransactionsRepository } from "../database/repositories/transactions.repository";
import type {
	CreateTransactionDTO,
	GetDashBoardDTO,
	GetFinancialEvolutionDTO,
	IndexTransactionsDTO,
} from "../dtos/transactions.dto";
import { Balance } from "../entities/balance.entity";
import type { Expense } from "../entities/expense.entity";
import { Transaction } from "../entities/transactions.entity";
import { AppError } from "../errors/app-error";
import type { CategoriesRepository } from "./../database/repositories/categories.repository";

export class TransactionsService {
	constructor(
		private transactionsRepository: TransactionsRepository,
		private categoriesRepository: CategoriesRepository,
	) {}

	async create({
		title,
		type,
		date,
		categoryId,
		amount,
	}: CreateTransactionDTO): Promise<Transaction> {
		const category = await this.categoriesRepository.findById(categoryId);

		if (!category) {
			throw new AppError("Category does not existes.", StatusCodes.BAD_REQUEST);
		}

		const transaction = new Transaction({
			title,
			type,
			date,
			category,
			amount,
		});

		const createdTransaction =
			await this.transactionsRepository.create(transaction);

		return createdTransaction;
	}

	async index(filters: IndexTransactionsDTO): Promise<Transaction[]> {
		const transaction = await this.transactionsRepository.index(filters);

		return transaction;
	}

	async getDashboard({
		beginDate,
		endDate,
	}: GetDashBoardDTO): Promise<{ balance: Balance; expenses: Expense[] }> {
		let [balance, expenses] = await Promise.all([
			this.transactionsRepository.getBalance({
				beginDate,
				endDate,
			}),
			this.transactionsRepository.getExpenses({
				beginDate,
				endDate,
			}),
		]);

		if (!balance) {
			balance = new Balance({
				_id: null,
				incomes: 0,
				expenses: 0,
				balance: 0,
			});
		}

		return { balance, expenses };
	}

	async getFinancialEvolution({
		year,
	}: GetFinancialEvolutionDTO): Promise<Balance[]> {
		const financialEvolution =
			await this.transactionsRepository.getFinancialEvolution({ year });

			return financialEvolution;
	}
}
