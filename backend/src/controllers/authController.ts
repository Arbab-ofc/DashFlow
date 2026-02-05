import { NextFunction, Request, Response } from "express";
import { login, signup } from "../services/authService";
import { successResponse } from "../utils/responses";

export const signupHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    const result = await signup(name, email, password);
    successResponse(res, result, "Signup successful", 201);
  } catch (error) {
    next(error);
  }
};

export const loginHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;
    const result = await login(email, password);
    successResponse(res, result, "Login successful");
  } catch (error) {
    next(error);
  }
};
