import { Auth } from "@/api/auth/schemas/auth.schema";
import { Buyer } from "@/api/buyers/queries/current-buyer/curren-buyer.type";
import { create } from "zustand";

type States = {
  //   authUser: Array<Auth> | [];
  authUser: Auth | null;
  buyer: Buyer | null;
  //   seller: null;
};

type Actions = {
  setAuthUser: (user: Auth) => void;
  setBuyer: (buyer: Buyer) => void;
};

export const useAuthStore = create<States & Actions>((set) => ({
  authUser: null,
  buyer: null,
  setAuthUser: (user: Auth) => set({ authUser: user }),
  setBuyer: (buyer: Buyer) => set({ buyer: buyer }),

  // set(() => ({
  //   authUser: user,
  // })),
}));
