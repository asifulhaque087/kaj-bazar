import { createSellerApi } from "@/api/sellers/mutations/create-seller/create-seller.api";
import { CreateSellerFormFields } from "@/api/sellers/mutations/create-seller/create-seller.type";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { UseFormReset, UseFormSetError } from "react-hook-form";
import { toast } from "sonner";

// ** --- hook type ---
interface UseCreateSeller {
  setError: UseFormSetError<CreateSellerFormFields>;
  reset: UseFormReset<CreateSellerFormFields>;
}

// *** --- error type ---
interface ApiValidationError {
  errors: { message: string; field?: string }[];
}

// ** --- DataType ---

export const useCreateSeller = (props: UseCreateSeller) => {
  // ** Props
  const { reset, setError } = props;

  // const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSellerFormFields) => createSellerApi(data),

    onError: (error: AxiosError) => {
      const { errors } = error.response?.data as ApiValidationError;

      // toast.error(errors[0].message);

      // validation errors
      // if (error.status === 400) {
      errors.forEach((err) =>
        setError(err.field as "root", { message: err.message })
      );
      // }

      // if (error.status !== 400) {
      //   const errors = error?.response?.data as string;
      //   toast.error(errors);
      // }
    },

    onSuccess: (data) => {
      toast.success("Login successfully");
      reset();
    },

    onSettled: (_, error) => {
      // if (error) {
      //   console.log(error);
      // } else {
      //   queryClient.invalidateQueries({
      //     queryKey: ["categories"],
      //   });
      // }
    },
  });
};
