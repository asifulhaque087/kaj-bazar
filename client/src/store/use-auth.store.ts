import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Auth, Buyer, Seller } from "@/schemas";

type States = {
  authUser: Auth | null;
  buyer: Buyer | null;
  role: "buyer" | "seller" | null;
  otherBuyer: Buyer | null;
  otherSeller: Seller | null;
  seller: Seller | null;
};

type Actions = {
  setAuthUser: (user: Auth) => void;
  setBuyer: (buyer: Buyer) => void;
  setOtherBuyer: (buyer: Buyer) => void;
  setOtherSeller: (seller: Seller) => void;
  setRole: (role: "buyer" | "seller" | null) => void;
};

export const useAuthStore = create<States & Actions>()(
  persist(
    (set, get) => ({
      authUser: null,
      buyer: null,
      otherBuyer: null,
      otherSeller: null,
      role: null, // Initialize role state
      seller: null,
      setAuthUser: (user: Auth) => set({ authUser: user }),
      setBuyer: (buyer: Buyer) => set({ buyer: buyer }),
      setOtherBuyer: (buyer: Buyer) => set({ otherBuyer: buyer }),
      setOtherSeller: (seller: Seller) => set({ otherSeller: seller }),
      setRole: (role: "buyer" | "seller" | null) => set({ role: role }),
    }),
    {
      name: "auth-storage", // A unique name for your storage
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ role: state.role }), // Specify which part of the state to persist
    }
  )
);
