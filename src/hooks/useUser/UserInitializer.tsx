"use client";

import { useRef } from "react";
import { useUser } from "@/hooks/useUser";
import { UserType } from "@/@types/user";

export default function UserInitializer({ user }: { user: UserType }) {
  const initialized = useRef(false);
  if (!initialized.current) {
    useUser.setState(user);
    initialized.current = true;
  }
  return null;
}
