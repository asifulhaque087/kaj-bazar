// import { create } from "zustand";
// import { persist, createJSONStorage, devtools } from "zustand/middleware";
// import { Auth, Buyer, Seller } from "@/schemas";

// type States = {
//   authUser: Auth | null;
//   buyer: Buyer | null;
//   role: "buyer" | "seller" | null;
//   otherBuyer: Buyer | null;
//   otherSeller: Seller | null;
//   seller: Seller | null;
// };

// type Actions = {
//   setAuthUser: (user: Auth) => void;
//   setBuyer: (buyer: Buyer) => void;
//   setSeller: (seller: Seller) => void;
//   setOtherBuyer: (buyer: Buyer) => void;
//   setOtherSeller: (seller: Seller) => void;
//   setRole: (role: "buyer" | "seller" | null) => void;
// };

// export const useAuthStore = create<States & Actions>()(
//   devtools(
//     // persist(
//     (set, get) => ({
//       authUser: null,
//       buyer: null,
//       otherBuyer: null,
//       otherSeller: null,
//       role: null, // Initialize role state
//       seller: null,
//       setAuthUser: (user: Auth) => set({ authUser: user }),
//       setBuyer: (buyer: Buyer) => set({ buyer: buyer }),
//       setSeller: (seller: Seller) => set({ seller: seller }),
//       setOtherBuyer: (buyer: Buyer) => set({ otherBuyer: buyer }),
//       setOtherSeller: (seller: Seller) => set({ otherSeller: seller }),
//       setRole: (role: "buyer" | "seller" | null) => set({ role: role }),
//     })
//   )
//   //   {
//   //     name: "auth-storage", // A unique name for your storage
//   //     storage: createJSONStorage(() => localStorage),
//   //     partialize: (state) => ({ role: state.role }), // Specify which part of the state to persist
//   //   }
//   // )
// );

import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";
import { Auth, Buyer, Seller } from "@/schemas";

type States = {
  initialRender: boolean;
  authUser: Auth | null;
  buyer: Buyer | null;
  role: "buyer" | "seller" | null;
  otherBuyer: Buyer | null;
  otherSeller: Seller | null;
  seller: Seller | null;
};

type Actions = {
  setInitialRenderFalse: () => void;
  setAuthUser: (user: Auth) => void;
  setBuyer: (buyer: Buyer) => void;
  setSeller: (seller: Seller) => void;
  setOtherBuyer: (buyer: Buyer) => void;
  setOtherSeller: (seller: Seller) => void;
  setRole: (role: "buyer" | "seller" | null) => void;
};

export const useAuthStore = create<States & Actions>()(
  devtools(
    persist(
      (set) => ({
        initialRender: true,
        authUser: null,
        buyer: null,
        otherBuyer: null,
        otherSeller: null,
        role: null, // Initialize role state
        seller: null,
        setAuthUser: (user) => set({ authUser: user }),
        setBuyer: (buyer) => set({ buyer: buyer }),
        setSeller: (seller) => set({ seller: seller }),
        setOtherBuyer: (buyer) => set({ otherBuyer: buyer }),
        setOtherSeller: (seller) => set({ otherSeller: seller }),
        setRole: (role) => set({ role: role }),
        setInitialRenderFalse: () => set({ initialRender: false }),
      }),
      {
        name: "auth-storage", // A unique name for your storage
        // storage: createJSONStorage(() => localStorage),
        storage: createJSONStorage(() => sessionStorage),
        partialize: (state) => ({ role: state.role }), // Specify which part of the state to persist
      }
    )
  )
);
