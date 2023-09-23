"use client";
//instalar biblioteca(yarn add nookies)
//instalar biblioteca(yarn add @types/cookie -D)
import { createContext, useEffect, useState, ReactNode } from "react";
import { SignInRequest } from "../services/auth";
import { setCookie, parseCookies } from "nookies";
import Router from "next/router";
import { recoverUserInformation } from "../services/auth";
import { api } from "@/services/api";

type User = {
  username: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  signIn: (data: SignInData) => Promise<void>;
};
type SignInData = {
  username: string;
  password: string;
};

export const AuthContext = createContext({} as AuthContextType);

  export function AuthProvider({ children }: {children: ReactNode}) {
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = !!user;

  useEffect(() => {
    const { "nextauth.token": token } = parseCookies();
    if (token) {
      recoverUserInformation().then((response) => {
        setUser(response.user);
      });
    }
  }, []);

  async function signIn({ username, password }: SignInData) {
    const { token, user } = await SignInRequest({
      username,
      password,
    });
    setCookie(undefined, "nextauth.token", token, {
      maxAge: 60 * 60 * 1,
    }); //1hora

    api.defaults.headers["Authotization"] = "Bearer ${token}";

    setUser(user);
    Router.push("/paginicial");
  } //alterar pagina redirecionamento

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
