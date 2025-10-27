import { BuyerReviewSellerForm, Order, SellerReviewBuyerForm } from "@/schemas";

export const buyerReviewSellerDefaultForm = (
  order: Order | null
): Partial<BuyerReviewSellerForm> => {
  let baseDefaults: Partial<BuyerReviewSellerForm> = {
    gigId: order?.gig.id ?? "",
    gigImage: order?.gig.coverImage ?? "",
    gigTitle: order?.gig.title ?? "",

    orderId: order?.id ?? "",
    buyerId: order?.buyer.id ?? "",
    sellerId: order?.seller.id ?? "",

    // senderId: authUser?.id,
    // senderUsername: authUser?.username,
    // senderImage: authUser?.profilePicture,
    // senderCountry: authUser?.country,

    senderId: order?.buyer.id ?? "",
    senderUsername: order?.buyer.username ?? "",
    senderImage: order?.buyer.profilePicture ?? "",
    // senderCountry: order?.buyer.country,

    receiverId: order?.seller.id ?? "",

    ratings: 0,

    comment: "",
  };

  return baseDefaults;
};

export const sellerReviewBuyerDefaultForm = (
  order: Order | null
): Partial<SellerReviewBuyerForm> => {
  let baseDefaults: Partial<SellerReviewBuyerForm> = {
    gigId: order?.gig.id ?? "",
    gigImage: order?.gig.coverImage ?? "",
    gigTitle: order?.gig.title ?? "",

    orderId: order?.id ?? "",
    buyerId: order?.buyer.id ?? "",
    sellerId: order?.seller.id ?? "",

    // senderId: authUser?.id,
    // senderUsername: authUser?.username,
    // senderImage: authUser?.profilePicture,
    // senderCountry: authUser?.country,

    senderId: order?.seller.id ?? "",
    senderUsername: order?.seller.username ?? "",
    senderImage: order?.seller.profilePicture ?? "",
    // senderCountry: order?.buyer.country,

    receiverId: order?.buyer.id ?? "",

    ratings: 0,

    comment: "",
  };

  return baseDefaults;
};
