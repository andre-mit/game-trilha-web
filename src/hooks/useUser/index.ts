import { UserType } from "@/@types/user";
import { create } from "zustand";

export const useUser = create<UserType>((set) => ({
  id: "",
  name: "",
  email: "",
  balance: 0,
  roles: [],
  profile: null
}));
