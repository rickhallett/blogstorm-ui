"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthResponse, Credentials, User } from "@/types/auth";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

interface AuthContextType extends AuthState {
  login: (credentials: Credentials) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null,
  });
  const router = useRouter();
  console.log(router);

  useEffect(() => {
    const initAuth = async () => {
      try {
        // const response = await fetch("api/auth/session");
        // const data = (await response.json()) as AuthResponse;

        const data: AuthResponse = {
          user: {
            id: "",
            name: "test-user",
            email: "test@user.com",
            avatarUrl: "public/blank-profile-picture.png",
          },
          tokens: {
            accessToken: "test-token",
            expiresIn: 3600,
          },
        };

        console.log(data);

        if (data.user) {
          setState((prev) => ({ ...prev, user: data.user }));
        }
      } catch (error) {
        console.error("Session authentication error", error);
      } finally {
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    };

    console.log("useeffect");

    initAuth();
  }, []);

  const login = async (credentials: Credentials) => {};

  const logout = async () => {};

  const context = {
    ...state,
    login,
    logout,
  };
  console.log(context);

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  console.log("useauth", context);
  return context;
};
