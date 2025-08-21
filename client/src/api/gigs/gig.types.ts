import { CreateGigForm, UpdateGigForm } from "@/schemas";
import { UseFormReset, UseFormSetError } from "react-hook-form";

export interface UseCreateGigProps {
  setError: UseFormSetError<CreateGigForm>;
  reset: UseFormReset<CreateGigForm>;
}


export interface UseUpdateGigProps {
  setError: UseFormSetError<UpdateGigForm>;
  // reset: UseFormReset<CreateGigForm>;
}
