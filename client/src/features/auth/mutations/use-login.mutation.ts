import { login } from "@/features/auth/api/mutations.api";
import { LoginForm } from "@/features/auth/schemas/login.schema";
import { useAuthStore } from "@/store/use-auth.store";
import { useChatStore } from "@/store/use-chat.store";
import { ApiValidationError } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Dispatch, SetStateAction } from "react";
import { UseFormReset, UseFormSetError } from "react-hook-form";
import { toast } from "sonner";

export interface UseLoginProps {
  setError: UseFormSetError<LoginForm>;
  reset: UseFormReset<LoginForm>;
  setShowModal: (i: number) => void;
}

export const useLogin = (props: UseLoginProps) => {
  // ** --- props ---
  const { reset, setError, setShowModal } = props;

  // ** --- Store ---
  const { connectSocket } = useChatStore();
  const { setAuthUser } = useAuthStore();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginForm) => login(data),

    onSuccess: (data) => {
      setAuthUser(data.user);
      connectSocket();

      queryClient.invalidateQueries({ queryKey: ["current-buyer"] });
      queryClient.invalidateQueries({ queryKey: ["current-seller"] });

      toast.success("Login successfully");
      reset();
      setShowModal(-1);
    },

    onError: (error: AxiosError) => {
      const { errors } = error.response?.data as ApiValidationError;
      errors.forEach((err) =>
        setError(err.field as "root", { message: err.message })
      );
    },

    // onSettled: (_, error) => {},
  });
};
