import { Auth, Buyer, Seller } from "@/schemas";
import { create } from "zustand";

type States = {
  //   authUser: Array<Auth> | [];
  authUser: Auth | null;
  buyer: Buyer | null;
  otherBuyer: Buyer | null;
  otherSeller: Seller | null;
  //   seller: null;
};

type Actions = {
  setAuthUser: (user: Auth) => void;
  setBuyer: (buyer: Buyer) => void;
  setOtherBuyer: (buyer: Buyer) => void;
  setOtherSeller: (seller: Seller) => void;
};

export const useAuthStore = create<States & Actions>((set) => ({
  authUser: null,
  buyer: null,
  otherBuyer: null,
  otherSeller: null,
  setAuthUser: (user: Auth) => set({ authUser: user }),
  setBuyer: (buyer: Buyer) => set({ buyer: buyer }),
  setOtherBuyer: (buyer: Buyer) => set({ otherBuyer: buyer }),
  setOtherSeller: (seller: Seller) => set({ otherSeller: seller }),

  // set(() => ({
  //   authUser: user,
  // })),
}));
