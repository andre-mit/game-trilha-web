"use server";
import { fetchWrapper } from "@/services/fetchWrapper";

export const requestCode = async (
  email: string
): Promise<{ error?: string }> => {
  try {
    const result = await fetchWrapper<string>(
      `users/recover-password/${email}`,
      {
        method: "GET",
        cache: "no-cache",
      },
      null,
      "text"
    );

    if (result.success) {
      return {};
    } else {
      return { error: result.data };
    }
  } catch (e) {
    return {
      error: "Ocorreu um erro ao se comunicar com servidor. Tente novamente",
    };
  }
};

export const requestRecovery = async <T = unknown>(
  email: string,
  code: string,
  password: string,
  confirmPassword: string
): Promise<{ success: boolean; data?: T | string | null; error?: string }> => {
  try {
    const body = {
      email,
      code,
      password,
      confirmPassword,
    };

    const result = await fetchWrapper<T>(
      `users/recover-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        cache: "no-cache",
      },
      null,
      "text"
    );

    if (result.success) {
      return { success: result.success, data: null };
    } else {
      if (result.statusCode === 403)
        return { success: result.success, error: "Código inválido" };
      else return { success: result.success, error: result.data };
    }
  } catch (e) {
    return {
      success: false,
      error: "Ocorreu um erro ao se comunicar com servidor. Tente novamente",
    };
  }
};
