import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import type { CreateCategoryDTO } from '../dtos/categories.dto';
import type { CategoriesService } from '../services/categories.services';
import type { BodyRequest } from './types';

export class CategoriesControllers {
  constructor(private categoriesService: CategoriesService) {}

  create = async (
    req: BodyRequest<CreateCategoryDTO>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { title, color } = req.body;

      const result = await this.categoriesService.create({ title, color });

      res.status(StatusCodes.CREATED).json(result);
    } catch (err) {
      next(err);
    }
  };

  index = async (
    _: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = await this.categoriesService.index();

      res.status(StatusCodes.OK).json(result);
    } catch (err) {
      next(err);
    }
  };
}
