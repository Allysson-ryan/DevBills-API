import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import type {
  CreateTransactionDTO,
  GetDashBoardDTO,
  GetFinancialEvolutionDTO,
  IndexTransactionsDTO,
} from '../dtos/transactions.dto';
import type { TransactionsService } from '../services/transactions.service';
import type { BodyRequest, QueryRequest } from './types';

export class TransactionControllers {
  constructor(private transactionsService: TransactionsService) {}

  create = async (
    req: BodyRequest<CreateTransactionDTO>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { title, amount, categoryId, date, type } = req.body;

      const result = await this.transactionsService.create({
        title,
        amount,
        categoryId,
        date,
        type,
      });

      res.status(StatusCodes.CREATED).json(result);
    } catch (err) {
      next(err);
    }
  };

  index = async (
    req: QueryRequest<IndexTransactionsDTO>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { title, categoryId, beginDate, endDate } = req.query;

      const result = await this.transactionsService.index({
        title,
        categoryId,
        beginDate,
        endDate,
      });

      res.status(StatusCodes.OK).json(result);
    } catch (err) {
      next(err);
    }
  };

  getDashboard = async (
    req: QueryRequest<GetDashBoardDTO>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { beginDate, endDate } = req.query;

      const result = await this.transactionsService.getDashboard({
        beginDate,
        endDate,
      });

      res.status(StatusCodes.OK).json(result);
    } catch (err) {
      next(err);
    }
  };

  getFinancialEvolution = async (
    req: QueryRequest<GetFinancialEvolutionDTO>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { year } = req.query;

      const result = await this.transactionsService.getFinancialEvolution({
        year,
      });

      res.status(StatusCodes.OK).json(result);
    } catch (err) {
      next(err);
    }
  };
}
