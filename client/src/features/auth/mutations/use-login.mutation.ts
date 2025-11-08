import { login } from "@/features/auth/api/mutations.api";
import { LoginForm } from "@/features/auth/schemas/login.schema";
import { useCurrentBuyer } from "@/features/buyer/queries/use-current-buyer.query";
import { useAuthStore } from "@/store/use-auth.store";
import { useChatStore } from "@/store/use-chat.store";
import { ApiValidationError } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Dispatch, SetStateAction } from "react";
import { UseFormReset, UseFormSetError } from "react-hook-form";
import { toast } from "sonner";

export interface UseLoginProps {
  setError: UseFormSetError<LoginForm>;
  reset: UseFormReset<LoginForm>;
  setShowModal: Dispatch<SetStateAction<number>>;
}

export const useLogin = (props: UseLoginProps) => {
  // ** Props
  const { reset, setError, setShowModal } = props;

  // ** --- Store ---
  const { connectSocket } = useChatStore();
  // const { setAuthUser, authUser, } = useAuthStore();
  const { setAuthUser, authUser, role } = useAuthStore();

  // useCurrentBuyer(authUser?.id);
  // console.log("I am calling")
  // useCurrentBuyer(authUser?.id);
  useCurrentBuyer();

  // const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginForm) => login(data),

    onSuccess: (data) => {
      // console.log("data of login is ", data.user);
      setAuthUser(data.user);
      connectSocket();

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

    onSettled: (_, error) => {},
  });
};
