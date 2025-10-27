import { createSeller } from "@/features/seller/api/mutations.api";
import { CreateSellerForm, CreateSellerPayload } from "@/schemas";
import { ApiValidationError } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { UseFormReset, UseFormSetError } from "react-hook-form";
import { toast } from "sonner";

export interface UseCreateSellerProps {
  setError: UseFormSetError<CreateSellerForm>;
  reset: UseFormReset<CreateSellerForm>;
}

export const useCreateSeller = (props: UseCreateSellerProps) => {
  // ** Props
  const { reset, setError } = props;

  return useMutation({
    mutationFn: (data: CreateSellerPayload) => createSeller(data),

    onSuccess: (data) => {
      toast.success("Login successfully");
      reset();
    },

    onError: (error: AxiosError) => {
      const { errors } = error.response?.data as ApiValidationError;
      errors.forEach((err) =>
        setError(err.field as "root", { message: err.message })
      );
    },
  });
};
