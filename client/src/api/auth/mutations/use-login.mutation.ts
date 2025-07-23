import { login } from "@/api/auth/mutations/mutations.apis";
import { LoginFormField } from "@/api/auth/schemas/login.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Dispatch, SetStateAction } from "react";
import { UseFormReset, UseFormSetError } from "react-hook-form";
import { toast } from "sonner";

interface UseLogin {
  setError: UseFormSetError<LoginFormField>;
  reset: UseFormReset<LoginFormField>;
  setShowModal: Dispatch<SetStateAction<number>>;
}

interface ApiValidationError {
  errors: { message: string; field?: string }[];
  // message: string;
}

export const useLogin = (props: UseLogin) => {
  // ** Props
  const { reset, setError, setShowModal } = props;

  // const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginFormField) => login(data),

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
      setShowModal(-1);
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
