import { createSeller } from "@/api/sellers/seller.service";
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
