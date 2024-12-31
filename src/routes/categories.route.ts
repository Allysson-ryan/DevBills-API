import { Router } from 'express';

import { CategoriesControllers } from '../controllers/categories.controller';
import { createCategorySchema } from '../dtos/categories.dto';
import { CategoriesFactory } from '../factories/categories.factory';
import { ParamsType, validator } from '../middleware/validator.middleware';

export const categoriesRoutes = Router();

const controller = new CategoriesControllers(
  CategoriesFactory.getServiceInstance(),
);

categoriesRoutes.get('/', controller.index);

categoriesRoutes.post(
  '/',
  validator({
    schema: createCategorySchema,
    type: ParamsType.BODY,
  }),
  controller.create,
);
