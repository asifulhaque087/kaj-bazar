import { CreateMessageForm } from "@/features/chat/schemas/create-message.schema";
import { Conversation } from "@/features/shared";
import { ChatUser } from "@/store/use-chat.store";

// export const createMessageDefaultForm = (
//   authUser: Auth | null,
//   selectedConversation: Conversation | null,
//   otherSeller: Seller | null,
//   otherBuyer: Buyer | null
// ): Partial<CreateMessageForm> => {
//   const isBuyer = checkBuyer(selectedConversation, authUser);
//   const isSeller = !isBuyer;

//   // console.log("seller id is ", isSeller ? authUser?.id : otherBuyer?.id);

//   let baseDefaults: Partial<CreateMessageForm> = {
//     conversationId: selectedConversation?.id ?? "",
//     senderUsername: authUser?.username ?? "",
//     receiverUsername:
//       (isBuyer ? otherSeller?.username : otherBuyer?.username) ?? "",
//     senderPicture: authUser?.profilePicture ?? "",
//     receiverPicture:
//       (isBuyer ? otherSeller?.profilePicture : otherBuyer?.profilePicture) ??
//       "",
//     buyerId: isBuyer ? authUser?.id : otherBuyer?.id,
//     sellerId: isSeller ? authUser?.id : otherSeller?.id,

//     // ** Optional
//     body: "",
//     hasOffer: false,

//     offer: {
//       gigTitle: "",
//       gigId: "",
//       description: "",
//       price: 0,
//       deliveryInDays: 0,
//       // ** optional
//       oldDeliveryDate: "",
//       newDeliveryDate: "",
//       accepted: false,
//       cancelled: false,
//     },
//   };

//   // if (conversationId) {
//   //   baseDefaults = {
//   //     ...baseDefaults,
//   //     conversationId: conversationId,
//   //   };
//   // }

//   // if (buyer) {
//   //   baseDefaults = {
//   //     ...baseDefaults,
//   //     senderUsername: buyer.username,
//   //     senderPicture: buyer.profilePicture,
//   //     buyerId: buyer.id,
//   //   };
//   // }

//   // if (gig) {
//   //   baseDefaults = {
//   //     ...baseDefaults,
//   //     receiverUsername: gig.username,
//   //     receiverPicture: gig.profilePicture,
//   //   };
//   // }

//   return baseDefaults;
// };

export const createMessageDefaultForm = (
  messageSenderUser: ChatUser | null,
  messageReceiverUser: ChatUser | null,
  selectedConversation: Conversation | null
): Partial<CreateMessageForm> => {
  // const isBuyer = checkBuyer(selectedConversation, authUser);
  // const isSeller = !isBuyer;

  // console.log("seller id is ", isSeller ? authUser?.id : otherBuyer?.id);

  let baseDefaults: Partial<CreateMessageForm> = {
    conversationId: selectedConversation?.id ?? "",
    senderUsername: messageSenderUser?.name ?? "",
    receiverUsername: messageReceiverUser?.name ?? "",
    senderPicture: messageSenderUser?.profilePhoto ?? "",
    receiverPicture: messageReceiverUser?.profilePhoto ?? "",
    // buyerId: isBuyer ? authUser?.id : otherBuyer?.id,
    // sellerId: isSeller ? authUser?.id : otherSeller?.id,

    // ** Optional
    body: "",
    hasOffer: false,

    offer: {
      gigTitle: "",
      gigId: "",
      description: "",
      price: 0,
      deliveryInDays: 1,
      // ** optional
      oldDeliveryDate: "",
      newDeliveryDate: "",
      accepted: false,
      cancelled: false,
    },
  };

  return baseDefaults;
};
