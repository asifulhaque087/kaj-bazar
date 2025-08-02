import {
  Auth,
  Buyer,
  Conversation,
  CreateMessageForm,
  Gig,
  Seller,
} from "@/schemas";

// export const createMessageDefaultForm = (

//   conversationId: string | null,
//   buyer: Buyer | null,
//   // authUser: Auth | null,
//   gig: Gig | null
// ): Partial<CreateMessageForm> => {
//   let baseDefaults: Partial<CreateMessageForm> = {
//     senderUsername: "",
//     receiverUsername: "",
//     senderPicture: "",
//     receiverPicture: "",
//     body: "",
//   };

//   if (conversationId) {
//     baseDefaults = {
//       ...baseDefaults,
//       conversationId: conversationId,
//     };
//   }

//   if (buyer) {
//     baseDefaults = {
//       ...baseDefaults,
//       senderUsername: buyer.username,
//       senderPicture: buyer.profilePicture,
//       buyerId: buyer.id,
//     };
//   }

//   if (gig) {
//     baseDefaults = {
//       ...baseDefaults,
//       receiverUsername: gig.username,
//       receiverPicture: gig.profilePicture,
//       sellerId: gig.sellerId,
//     };
//   }

//   return baseDefaults;
// };

export const createMessageDefaultForm = (
  // conversationId: string | null,
  // buyer: Buyer | null,
  authUser: Auth | null,
  selectedConversation: Conversation | null,
  otherSeller: Seller | null,
  otherBuyer: Buyer | null
  // gig: Gig | null
): Partial<CreateMessageForm> => {
  const isBuyer = checkBuyer(selectedConversation, authUser);
  const isSeller = !isBuyer;

  // console.log("seller id is ", isSeller ? authUser?.id : otherBuyer?.id);

  let baseDefaults: Partial<CreateMessageForm> = {
    conversationId: selectedConversation?.id ?? "",
    senderUsername: authUser?.username ?? "",
    receiverUsername:
      (isBuyer ? otherSeller?.username : otherBuyer?.username) ?? "",
    senderPicture: authUser?.profilePicture ?? "",
    receiverPicture:
      (isBuyer ? otherSeller?.profilePicture : otherBuyer?.profilePicture) ??
      "",
    buyerId: isBuyer ? authUser?.id : otherBuyer?.id,
    sellerId: isSeller ? authUser?.id : otherSeller?.id,

    // ** Optional
    body: "",
  };

  // if (conversationId) {
  //   baseDefaults = {
  //     ...baseDefaults,
  //     conversationId: conversationId,
  //   };
  // }

  // if (buyer) {
  //   baseDefaults = {
  //     ...baseDefaults,
  //     senderUsername: buyer.username,
  //     senderPicture: buyer.profilePicture,
  //     buyerId: buyer.id,
  //   };
  // }

  // if (gig) {
  //   baseDefaults = {
  //     ...baseDefaults,
  //     receiverUsername: gig.username,
  //     receiverPicture: gig.profilePicture,
  //   };
  // }

  return baseDefaults;
};

const checkBuyer = (
  selectedConversation: Conversation | null,
  authUser: Auth | null
) => {
  const isBuyer = selectedConversation?.senderUsername === authUser?.username;
  return isBuyer;

  // const otherUser = isBuyer ? otherSeller : otherBuyer;

  // return [isBuyer, otherUser];
};

// const checkBuyer = (
//   selectedConversation: Conversation | null,
//   authUser: Auth | null,
//   otherBuyer: Buyer | null,
//   otherSeller: Seller | null
// ) => {
//   const isBuyer = selectedConversation?.senderUsername === authUser?.username;
//   return isBuyer;

//   // const otherUser = isBuyer ? otherSeller : otherBuyer;

//   // return [isBuyer, otherUser];
// };
