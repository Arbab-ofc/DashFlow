import { PrismaClient } from "@prisma/client";
import { hashPassword, verifyPassword } from "../utils/password";

const prisma = new PrismaClient();

interface UserProfile {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
}

export const getProfile = async (userId: number): Promise<UserProfile> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, email: true, createdAt: true }
  });

  if (!user) {
    const error = new Error("User not found");
    (error as Error & { statusCode?: number }).statusCode = 404;
    throw error;
  }

  return user;
};

export const updateProfile = async (
  userId: number,
  data: { name?: string; email?: string }
): Promise<UserProfile> => {
  if (data.email) {
    const existing = await prisma.user.findUnique({
      where: { email: data.email }
    });

    if (existing && existing.id !== userId) {
      const error = new Error("Email already in use");
      (error as Error & { statusCode?: number }).statusCode = 409;
      throw error;
    }
  }

  const user = await prisma.user.update({
    where: { id: userId },
    data,
    select: { id: true, name: true, email: true, createdAt: true }
  });

  return user;
};

export const updatePassword = async (
  userId: number,
  currentPassword: string,
  newPassword: string
): Promise<void> => {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    const error = new Error("User not found");
    (error as Error & { statusCode?: number }).statusCode = 404;
    throw error;
  }

  const isValid = await verifyPassword(user.password, currentPassword);

  if (!isValid) {
    const error = new Error("Current password is incorrect");
    (error as Error & { statusCode?: number }).statusCode = 401;
    throw error;
  }

  const hashedPassword = await hashPassword(newPassword);
  await prisma.user.update({
    where: { id: userId },
    data: { password: hashedPassword }
  });
};
