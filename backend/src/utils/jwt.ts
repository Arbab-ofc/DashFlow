import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../config/env";

export interface AuthTokenPayload {
  userId: number;
  email: string;
}

export const generateToken = (payload: AuthTokenPayload): string => {
  return jwt.sign(payload, config.JWT_SECRET, { expiresIn: "7d" });
};

export const verifyToken = (token: string): AuthTokenPayload & JwtPayload => {
  return jwt.verify(token, config.JWT_SECRET) as AuthTokenPayload & JwtPayload;
};
