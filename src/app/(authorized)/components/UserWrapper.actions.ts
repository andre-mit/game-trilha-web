"use server";

import { UserType } from "@/hooks/useUser";
import { fetchWrapper } from "@/services/fetchWrapper";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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
