import { PrismaClient } from "@prisma/client";
import { generateToken } from "../utils/jwt";
import { hashPassword, verifyPassword } from "../utils/password";

const prisma = new PrismaClient();

interface AuthResponse {
  token: string;
  user: {
    id: number;
    email: string;
    name: string;
  };
}

export const signup = async (
  name: string,
  email: string,
  password: string
): Promise<AuthResponse> => {
  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    const error = new Error("Email already in use");
    (error as Error & { statusCode?: number }).statusCode = 409;
    throw error;
  }

  const hashedPassword = await hashPassword(password);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  });

  const token = generateToken({ userId: user.id, email: user.email });

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name
    }
  };
};

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    const error = new Error("Invalid email or password");
    (error as Error & { statusCode?: number }).statusCode = 401;
    throw error;
  }

  const isValid = await verifyPassword(user.password, password);

  if (!isValid) {
    const error = new Error("Invalid email or password");
    (error as Error & { statusCode?: number }).statusCode = 401;
    throw error;
  }

  const token = generateToken({ userId: user.id, email: user.email });

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name
    }
  };
};
