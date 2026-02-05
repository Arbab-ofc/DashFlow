import api from "./api";
import { AuthResponse } from "../types";

const TOKEN_KEY = "dashflow_token";
const LOGOUT_EVENT = "dashflow:logout";

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const logout = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  window.dispatchEvent(new Event(LOGOUT_EVENT));
};

export const onLogout = (handler: () => void): (() => void) => {
  window.addEventListener(LOGOUT_EVENT, handler);
  return () => window.removeEventListener(LOGOUT_EVENT, handler);
};

export const signup = async (data: {
  name: string;
  email: string;
  password: string;
}): Promise<AuthResponse> => {
  const response = await api.post("/auth/signup", data);
  return response.data.data;
};

export const login = async (data: {
  email: string;
  password: string;
}): Promise<AuthResponse> => {
  const response = await api.post("/auth/login", data);
  return response.data.data;
};
