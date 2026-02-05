import { NextFunction, Request, Response } from "express";
import { getProfile, updateProfile } from "../services/userService";
import { successResponse } from "../utils/responses";

export const getMeHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      const error = new Error("Unauthorized");
      (error as Error & { statusCode?: number }).statusCode = 401;
      throw error;
    }

    const user = await getProfile(userId);
    successResponse(res, user, "Profile fetched");
  } catch (error) {
    next(error);
  }
};

export const updateMeHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      const error = new Error("Unauthorized");
      (error as Error & { statusCode?: number }).statusCode = 401;
      throw error;
    }

    const updated = await updateProfile(userId, req.body);
    successResponse(res, updated, "Profile updated");
  } catch (error) {
    next(error);
  }
};
