import api from "./api";
import { User } from "../types";

export const getProfile = async (): Promise<User> => {
  const response = await api.get("/me");
  return response.data.data;
};

export const updateProfile = async (data: Partial<Pick<User, "name" | "email">>): Promise<User> => {
  const response = await api.put("/me", data);
  return response.data.data;
};

export const updatePassword = async (data: {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}): Promise<void> => {
  await api.put("/me/password", data);
};
