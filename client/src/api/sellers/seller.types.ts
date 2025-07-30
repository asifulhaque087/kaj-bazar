import { CreateSellerForm } from "@/schemas";
import { UseFormReset, UseFormSetError } from "react-hook-form";

export interface UseCreateSellerProps {
  setError: UseFormSetError<CreateSellerForm>;
  reset: UseFormReset<CreateSellerForm>;
}
