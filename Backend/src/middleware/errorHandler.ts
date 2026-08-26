import type { ErrorRequestHandler, RequestHandler } from "express";
import { HttpError } from "../utils/httpError";
import type { ApiErrorResponse } from "../types";

export const notFoundHandler: RequestHandler = (_req, res) => {
  const response: ApiErrorResponse = {
    success: false,
    error: "Resource not found",
  };
  res.status(404).json(response);
};

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  const isHttpError = error instanceof HttpError;
  const status = isHttpError ? error.status : 500;
  const message = isHttpError ? error.message : "Internal server error";

  if (!isHttpError) {
    console.error(error);
  }

  const response: ApiErrorResponse = { success: false, error: message };
  res.status(status).json(response);
};
