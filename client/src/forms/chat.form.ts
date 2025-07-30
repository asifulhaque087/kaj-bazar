import { Buyer, CreateMessageForm, Gig } from "@/schemas";

export const createMessageDefaultForm = (
  conversationId: string | null,
  buyer: Buyer | null,
  gig: Gig | null
): Partial<CreateMessageForm> => {
  let baseDefaults: Partial<CreateMessageForm> = {
    senderUsername: "",
    receiverUsername: "",
    senderPicture: "",
    receiverPicture: "",
    body: "",
  };

  if (conversationId) {
    baseDefaults = {
      ...baseDefaults,
      conversationId: conversationId,
    };
  }

  if (buyer) {
    baseDefaults = {
      ...baseDefaults,
      senderUsername: buyer.username,
      senderPicture: buyer.profilePicture,
      buyerId: buyer.id,
    };
  }

  if (gig) {
    baseDefaults = {
      ...baseDefaults,
      receiverUsername: gig.username,
      receiverPicture: gig.profilePicture,
      sellerId: gig.sellerId,
    };
  }

  return baseDefaults;
};
