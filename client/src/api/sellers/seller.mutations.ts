import { createSellerApi } from "@/api/sellers/mutations/create-seller/create-seller.api";
import { UseCreateSellerProps } from "@/api/sellers/seller.types";
import { CreateSellerPayload } from "@/schemas/seller.schema";
import { ApiValidationError } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

// ** --- DataType ---

export const useCreateSeller = (props: UseCreateSellerProps) => {
  // ** Props
  const { reset, setError } = props;

  return useMutation({
    mutationFn: (data: CreateSellerPayload) => createSellerApi(data),

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
