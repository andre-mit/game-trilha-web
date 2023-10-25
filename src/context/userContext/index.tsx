"use client";
import { useState, useEffect, useCallback, ReactNode, useContext } from "react";
import Cookie from "js-cookie";

import { createContext } from "react";
import { fetchWrapper } from "@/services/fetchWrapper";

type UserProps = {
  id: string;
  email: string;
  name: string;
  balance: number;
  roles: string[];
};

type LoginProps = {
  token: string;
  user: UserProps;
};

type UserContextProps = {
  user: UserProps | null;
  token: string | null;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => void;
};

export const UserContext = createContext<UserContextProps | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProps | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const getUser = useCallback(async (bearerToken: string) => {
    if (!user) {
      const result = await fetchWrapper<UserProps>("users", {}, bearerToken);
      if (result.success) {
        setUser(result.data);
      }
    }
  }, [user]);

  useEffect(() => {
    var cookie_token = Cookie.get("auth_token");
    if (cookie_token) {
      setToken(cookie_token);
      getUser(cookie_token);
    }
  }, [getUser]);

  async function signIn(email: string, password: string) {
    const result = await fetchWrapper<LoginProps>("users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (result.success) {
      Cookie.set("auth_token", result.data.token);
      setToken(result.data.token);
      getUser(result.data.token);
    }

    return result.success;
  }

  function signOut() {
    Cookie.remove("auth_token");
    setUser(null);
    setToken(null);
  }

  return (
    <UserContext.Provider value={{ user, token, signIn, signOut }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
