import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../errors/app-error';

export function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({ message: error.message });
  }

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: error.message,
  });
}
