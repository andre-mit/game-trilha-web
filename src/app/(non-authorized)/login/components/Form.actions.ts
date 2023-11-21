"use server";
import { fetchWrapper } from "@/services/fetchWrapper";
import { cookies } from "next/headers";
import CurrentUserData from './userData';

export const login = async (formaData: FormData): Promise<{error?: string;}> => {
  const email = formaData.get("email");
  const password = formaData.get("password");

  try {
    const result = await fetchWrapper<string>(
      "users/login",
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
        cache: "no-cache",
      },
      null,
      "text"
    );
    
    if (result.success) {
      cookies().set("auth_token", result.data as string);
      CurrentUserData.setEmail(email!.toString());

      return {  };
    } else {
      return { error: result.data };
    }
  } catch (e) {
    return { error: "Ocorreu um erro ao se comunicar com servidor. Tente novamente" };
  }
};
