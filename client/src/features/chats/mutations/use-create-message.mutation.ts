import { createMessage } from "@/features/chats/api/mutations.api";
import { CreateMessageForm } from "@/features/chats/schemas/create-message.schema";
import { useMutation } from "@tanstack/react-query";

export const useCreateMessage = () => {
  return useMutation({
    mutationFn: (data: CreateMessageForm) => createMessage(data),
  });
};
