import { CreateGigForm } from "@/schemas";
import { UseFormReset, UseFormSetError } from "react-hook-form";

export interface UseCreateGigProps {
  setError: UseFormSetError<CreateGigForm>;
  reset: UseFormReset<CreateGigForm>;
}
