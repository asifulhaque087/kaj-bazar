import { getMessageById } from "@/features/chats/api/queries.api";
import { useQueryWithSideEffects } from "@/hooks/useQueryWithSideEffects";

export interface UseGetMessageByIdProps {
  id: string;
}

export const useGetMessageById = (props: UseGetMessageByIdProps) => {
  const { id } = props;

  return useQueryWithSideEffects({
    queryKey: ["message", id],
    queryFn: () => getMessageById(id),
    // enabled: !!conversationId,
    onSuccess: (fetchedData) => {},
    onError: (err) => {},
    onSettled: (settledData, settledError) => {},
  });
};
