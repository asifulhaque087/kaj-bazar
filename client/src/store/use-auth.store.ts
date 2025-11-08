import { Auth } from "@/features/auth/schemas/auth.schema";
import { Buyer } from "@/features/buyer/schemas/buyer.schema";
import { Seller } from "@/features/seller/schemas/seller.schema";
import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";

type States = {
  initialRender: boolean;
  authUser: Auth | null;
  buyer: Buyer | null;
  activeRole: "buyer" | "seller" | null;
  otherBuyer: Buyer | null;
  otherSeller: Seller | null;
  seller: Seller | null;
};

type Actions = {
  setInitialRenderFalse: () => void;
  setAuthUser: (user: Auth) => void;
  setBuyer: (buyer: Buyer | null) => void;
  setSeller: (seller: Seller | null) => void;
  setOtherBuyer: (buyer: Buyer) => void;
  setOtherSeller: (seller: Seller) => void;
  setActiveRole: (activeRole: "buyer" | "seller" | null) => void;
  resetAuthStore: () => void;
};

const initialStates: States = {
  initialRender: true,
  authUser: null,
  buyer: null,
  otherBuyer: null,
  otherSeller: null,
  activeRole: null,
  seller: null,
};

export const useAuthStore = create<States & Actions>()(
  devtools(
    persist(
      (set) => ({
        // initialRender: true,
        // authUser: null,
        // buyer: null,
        // otherBuyer: null,
        // otherSeller: null,
        // activeRole: null, // Initialize activeRole state
        // seller: null,
        ...initialStates,
        setAuthUser: (user) => set({ authUser: user }),
        setBuyer: (buyer) => set({ buyer: buyer }),
        setSeller: (seller) => set({ seller: seller }),
        setOtherBuyer: (buyer) => set({ otherBuyer: buyer }),
        setOtherSeller: (seller) => set({ otherSeller: seller }),
        setActiveRole: (activeRole) => set({ activeRole: activeRole }),
        setInitialRenderFalse: () => set({ initialRender: false }),
        resetAuthStore: () => set(initialStates),
      }),
      {
        name: "auth-storage", // A unique name for your storage
        // storage: createJSONStorage(() => localStorage),
        storage: createJSONStorage(() => sessionStorage),
        partialize: (state) => ({ activeRole: state.activeRole }), // Specify which part of the state to persist
      }
    )
  )
);
