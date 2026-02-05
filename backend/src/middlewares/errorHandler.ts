import { NextFunction, Request, Response } from "express";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";
import { errorResponse } from "../utils/responses";

interface AppError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  error: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): Response => {
  if (error instanceof ZodError) {
    return errorResponse(res, "Validation failed", 400, error.flatten().fieldErrors);
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      return errorResponse(res, "Unique constraint failed", 409);
    }
  }

  if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {
    return errorResponse(res, "Unauthorized", 401);
  }

  const status = error.statusCode ?? 500;
  const message = status === 500 ? "Internal server error" : error.message;

  return errorResponse(res, message, status);
};
