"use server";

import { UserType } from "@/@types/user";
import { fetchWrapper } from "@/services/fetchWrapper";
import { cookies } from "next/headers";

export const getUser = async () => {
  const token = cookies().get("auth_token")?.value;

  try {
    const response = await fetchWrapper<UserType>("Users", {}, token, "json");
    if (response.success) {
      return response.data;
    } else {
      cookies().delete("auth_token");
    }
  } catch (error) {
    cookies().delete("auth_token");
  }
};
