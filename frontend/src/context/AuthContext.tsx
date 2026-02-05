import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthResponse, User } from "../types";
import { getProfile } from "../services/userService";
import { getToken, login, logout, onLogout, setToken, signup } from "../services/authService";
import { toast } from "react-toastify";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  loginUser: (email: string, password: string) => Promise<void>;
  signupUser: (name: string, email: string, password: string) => Promise<void>;
  logoutUser: () => void;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const handleAuthSuccess = (response: AuthResponse): User => {
  setToken(response.token);
  return response.user;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProfile = useCallback(async () => {
    const token = getToken();

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const profile = await getProfile();
      setUser(profile);
    } catch (error) {
      logout();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    return onLogout(() => {
      setUser(null);
      navigate("/login");
    });
  }, [navigate]);

  const loginUser = async (email: string, password: string) => {
    const response = await login({ email, password });
    const nextUser = handleAuthSuccess(response);
    setUser(nextUser);
    toast.success("Login successful");
  };

  const signupUser = async (name: string, email: string, password: string) => {
    const response = await signup({ name, email, password });
    const nextUser = handleAuthSuccess(response);
    setUser(nextUser);
    toast.success("Signup successful");
  };

  const logoutUser = () => {
    logout();
    setUser(null);
    navigate("/login");
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(user),
      loginUser,
      signupUser,
      logoutUser,
      setUser
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
