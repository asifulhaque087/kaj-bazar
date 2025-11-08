import { logout } from "@/features/auth/api/mutations.api";
import { useAuthStore } from "@/store/use-auth.store";
import { useChatStore } from "@/store/use-chat.store";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useLogout = () => {
  // ** --- Store ---
  const { disConnectSocket, resetChatStore } = useChatStore();
  const { resetAuthStore } = useAuthStore();

  return useMutation({
    mutationFn: () => logout(),

    onSuccess: () => {
      disConnectSocket();
      resetAuthStore();
      resetChatStore();

      toast.success("Logout successfully");
    },
  });
};
