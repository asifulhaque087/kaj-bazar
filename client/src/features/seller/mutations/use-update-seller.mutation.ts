import { updateSeller } from "@/features/seller/api/mutations.api";
import {
  UpdateSellerForm,
  UpdateSellerPayload,
} from "@/features/seller/schemas/seller.schema";
import { ApiValidationError } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { UseFormReset, UseFormSetError } from "react-hook-form";
import { toast } from "sonner";

// ** --- DataType ---

export interface UseUpdateSellerProps {
  setError: UseFormSetError<UpdateSellerForm>;
  reset: UseFormReset<UpdateSellerForm>;
}

export const useUpdateSeller = (props: UseUpdateSellerProps) => {
  // ** Props
  const { reset, setError } = props;

  return useMutation({
    mutationFn: (data: UpdateSellerPayload) => updateSeller(data),

    onSuccess: (data) => {
      toast.success("Seller Updated Successfully");
      // reset();
    },

    onError: (error: AxiosError) => {
      const { errors } = error.response?.data as ApiValidationError;
      errors.forEach((err) =>
        setError(err.field as "root", { message: err.message })
      );
    },
  });
};
