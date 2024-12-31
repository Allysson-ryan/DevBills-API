"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const http_status_codes_1 = require("http-status-codes");
const app_error_1 = require("../errors/app-error");
// Ajuste para aceitar o erro de qualquer tipo
function errorHandler(error, // O Express permite qualquer tipo de erro aqui
req, res, next) {
    if (error instanceof app_error_1.AppError) {
        res.status(error.statusCode).json({ message: error.message });
    }
    res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message,
    });
}
