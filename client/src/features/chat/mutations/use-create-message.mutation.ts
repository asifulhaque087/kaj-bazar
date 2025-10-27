import { createMessage } from "@/features/chat/api/mutations.api";
import { CreateMessageForm } from "@/features/chat/schemas/create-message.schema";
import { useMutation } from "@tanstack/react-query";

export const useCreateMessage = () => {
  return useMutation({
    mutationFn: (data: CreateMessageForm) => createMessage(data),
  });
};
