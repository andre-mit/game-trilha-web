"use client";

import { useRef } from "react";
import { UserType, useUser } from "@/hooks/useUser";

export default function UserInitializer({ user }: { user: UserType }) {
  const initialized = useRef(false);
  if (!initialized.current) {
    useUser.setState(user);
    initialized.current = true;
  }
  return null;
}
