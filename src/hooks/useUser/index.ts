import { create } from "zustand";

export type UserType = {
  id: string;
  name: string;
  email: string;
  balance: number;
  roles: string[];
};

export const useUser = create<UserType>((set) => ({
  id: "",
  name: "",
  email: "",
  balance: 0,
  roles: [],
}));
