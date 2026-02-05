import { Response } from "express";

export const successResponse = <T>(
  res: Response,
  data: T,
  message = "Success",
  status = 200
): Response => {
  return res.status(status).json({
    success: true,
    message,
    data
  });
};

export const errorResponse = (
  res: Response,
  message: string,
  status = 500,
  errors?: Record<string, string[]>
): Response => {
  return res.status(status).json({
    success: false,
    message,
    errors
  });
};
