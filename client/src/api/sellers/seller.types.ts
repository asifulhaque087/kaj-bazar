import { Auth, CreateSellerForm, UpdateSellerForm } from "@/schemas";
import { UseFormReset, UseFormSetError } from "react-hook-form";

export interface UseCreateSellerProps {
  setError: UseFormSetError<CreateSellerForm>;
  reset: UseFormReset<CreateSellerForm>;
}

export interface UseUpdateSellerProps {
  setError: UseFormSetError<UpdateSellerForm>;
  reset: UseFormReset<UpdateSellerForm>;
}

export interface UseSellerByNameProps {
  username: string;
  isBuyer: boolean;
  authUser: Auth | null;
}

export interface UseSellerByIdProps {
  sellerId: string;
}
