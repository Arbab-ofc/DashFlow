import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";
import { errorResponse } from "../utils/responses";

export const validateRequest = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const parsed = schema.safeParse(req.body);

    if (!parsed.success) {
      errorResponse(res, "Validation failed", 400, parsed.error.flatten().fieldErrors);
      return;
    }

    req.body = parsed.data;
    next();
  };
};
