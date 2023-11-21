import { UserType } from "@/@types/user";
import { StoreApi, create } from "zustand";

type Actions = {
  increaseBalance: (value: number) => void;
  decreaseBalance: (value: number) => void;
};

export const useUser = create<UserType & Actions>((set, get) => ({
  id: "",
  name: "",
  email: "",
  balance: 0,
  roles: [],
  profile: null,

  increaseBalance: (value) => set({ balance: get().balance + value }),
  decreaseBalance: (value) => set({ balance: get().balance - value }),
}));
