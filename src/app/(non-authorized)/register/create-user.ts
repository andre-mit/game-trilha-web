"use server";
import { UserType } from "@/hooks/useUser";
import { fetchWrapper } from "@/services/fetchWrapper";

export type CreateUserType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export async function createUser(data: CreateUserType) {
  try {
    const result = await fetchWrapper<UserType>("users", {
      method: "POST",
      body: JSON.stringify(data),
      cache: "no-cache",
    });

    if (result.success) {
      return { user: result.data };
    } else {
      return { error: result.data };
    }
  } catch (error) {
    return { error: "Ocorreu um erro ao se comunicar com servidor. Tente novamente" };
  }
}
