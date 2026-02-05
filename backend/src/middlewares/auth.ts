import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { verifyToken } from "../utils/jwt";
import { errorResponse } from "../utils/responses";

const prisma = new PrismaClient();

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    errorResponse(res, "Unauthorized", 401);
    return;
  }

  const token = authHeader.replace("Bearer ", "").trim();

  try {
    const payload = verifyToken(token);
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, email: true, name: true }
    });

    if (!user) {
      errorResponse(res, "Unauthorized", 401);
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    errorResponse(res, "Unauthorized", 401);
  }
};
