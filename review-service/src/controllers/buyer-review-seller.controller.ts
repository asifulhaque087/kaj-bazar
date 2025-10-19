// ** Third Party Imports
import type { Request, Response } from "express";

// ** Local Imports
import { BadRequestError, handleAsync } from "@fvoid/shared-lib";
import { db } from "@src/db";
import type { BuyerReviewSellerInput } from "@src/validations/review.validation";
import { ReviewsTable } from "@src/schemas";
import { SellerReceivedReviewPublisher } from "@src/events/publishers/seller-received-review.publisher";
import { mqWrapper } from "@src/rabbitmq-wrapper";

const buyerReviewSeller = async (req: Request, res: Response) => {
  const reviewData = req.body as BuyerReviewSellerInput;
  // const {
  //   buyerId,
  //   gigId,
  //   gigImage,
  //   gigTitle,
  //   orderId,
  //   ratings,
  //   receiverId,
  //   sellerId,
  //   senderId,
  //   senderImage,
  //   senderUsername,
  //   comment,
  //   senderCountry,
  // } = req.body as BuyerReviewSellerInput;

  // Prepare auth data

  const [review] = await handleAsync(
    db.insert(ReviewsTable).values(reviewData).returning()
  );

  if (!review) throw new BadRequestError("review error");

  // ** Publish Event
  new SellerReceivedReviewPublisher(mqWrapper.channel).publish(review);

  //
  // new SellerReceivedReviewPublisher(mqWrapper.channel).publish({
  //   buyerId: review?.buyerId,
  //   comment: review?.comment,
  //   gigId: review?.gigId,
  //   gigImage: review?.gigImage,
  //   gigTitle: review?.gigTitle,
  //   orderId: review?.orderId,
  //   ratings: review?.ratings,
  //   receiverId: review?.receiverId,
  //   reivewGivenAt: review?.reivewGivenAt,
  //   sellerId: review?.sellerId,
  //   senderCountry: review?.senderCountry,
  //   senderId: review?.senderId,
  //   senderImage: review?.senderImage,
  //   senderUsername: review?.senderUsername,
  // });

  return res.json(review);
};

export default buyerReviewSeller;
