import { faker } from "@faker-js/faker";

import {
  catchError,
  ConnectionError,
  Exchanges,
  Listener,
  Queues,
  RoutingKeys,
  type ReviewSeedRequested,
} from "@fvoid/shared-lib";

import type { ConsumeMessage } from "amqplib";
import { db } from "@src/db";
import { ReviewsTable } from "@src/schemas";
import { ReviewSeededPublisher } from "@src/events/publishers/review-seeded.publisher";

// *** --- types ---

interface Order {
  id: string;
  gigId: string;
  gigImage: string;
  gigTitle: string;
  buyerId: string;
  buyerUsername: string;
  buyerProfilePicture: string;
  buyerCountry: string;
  sellerId: string;
  sellerUsername: string;
  sellerProfilePicture: string;
  sellerCountry: string;
  // buyerIsSender: boolean;
}

interface Review {
  id: string;
  buyerIsSender: boolean;
  gigId: string;
  gigImage: string;
  gigTitle: string;
  orderId: string;
  buyerId: string;
  sellerId: string;
  senderId: string;
  senderUsername: string;
  senderImage: string;
  senderCountry: string;
  receiverId: string;
  ratings: number;
  comment: string;
}

export class ReviewSeedRequestedListener extends Listener<ReviewSeedRequested> {
  exchangeName: Exchanges.ReviewSeedRequested = Exchanges.ReviewSeedRequested;
  queueName: Queues.ReviewSeedRequested = Queues.ReviewSeedRequested;
  routingKey: RoutingKeys.ReviewSeedRequested = RoutingKeys.ReviewSeedRequested;

  async onMessage(data: ReviewSeedRequested["data"], message: ConsumeMessage) {
    const { orders } = data;

    const reviews = await seedReview(orders);

    if (!reviews) throw new ConnectionError("something went wrong");

    const newReviews = reviews.map((review) => ({
      id: review.id,
      gigId: review.gigId,

      comment: review.comment as string | undefined,
      ratings: review.ratings,

      buyerId: review.buyerId,
      buyerIsSender: review.buyerIsSender,

      sellerId: review.sellerId,
      orderId: review.orderId,
    }));

    // ** --- publish an event ---
    new ReviewSeededPublisher(this.channel).publish({
      reviews: newReviews,
    });

    this.channel.ack(message);
  }
}

// ** --- seed function ---

const seedReview = async (orders: Order[]) => {
  // ** --- Remove All Reviews ---
  const tablesToDelete = [{ table: ReviewsTable, name: "Reviews" }];

  for (const { table, name } of tablesToDelete) {
    const [err] = await catchError(db.delete(table));
    if (err) throw new ConnectionError(`Error Empty ${name} !!`);
  }

  // 1 - loop in orders. for each order maximum two review possible. akta holo buyer seller ke dibe arekta holo seller buyer ke dibe. mane 2 ta review insert hobe. //todo  aptato amra 2 ta review e seed korbo, but future jekono akjon o korte parbe.

  // 2 - gig details, seller details & buyer details extract korte hobe.

  // 3 - buyer er protita review ke buyerReviewsToCreate a push korte hobe | r seller er gula sellerReviewsToCreate a push korte hobe.

  // 4 - buyersReviewsToCreate & sellerReveiwsToCreate merge kore insert korte hobe

  // 5 - finally send buyerReviews to a fanout channel and seller to its fanout channel. we will get back to this.

  // 6 - tarpore user gig order aita get kore nijeder db update korbe

  // interface Review

  const reviewsToCreate: Review[] = [];

  for (let i = 0; i < orders.length; i++) {
    console.log("The number is: " + i);
    const order = orders[i];

    if (!order) continue;

    reviewsToCreate.push(createFakeReview(order, true));
    reviewsToCreate.push(createFakeReview(order, false));
  }

  // ** --- realistic ratings ---

  const [errReviews, insertedReviews] = await catchError(
    db.insert(ReviewsTable).values(reviewsToCreate).returning()
  );

  if (errReviews) throw new ConnectionError("Error inserting reviews !!");

  return insertedReviews.map((rv, i) => ({
    ...rv,
    buyerIsSender: reviewsToCreate[i]?.buyerIsSender!,
  }));
};

const createFakeReview = (order: Order, buyerIsSender: boolean = false) => {
  return {
    id: faker.string.uuid(),
    buyerIsSender,
    gigId: order.gigId,
    gigImage: order.gigImage,
    gigTitle: order.gigTitle,
    orderId: order.id,
    buyerId: order.buyerId,
    sellerId: order.sellerId,
    senderId: buyerIsSender ? order.buyerId : order.sellerId,
    senderUsername: buyerIsSender ? order.buyerUsername : order.sellerUsername,
    senderImage: buyerIsSender
      ? order.buyerProfilePicture
      : order.sellerProfilePicture,
    senderCountry: buyerIsSender ? order.buyerCountry : order.sellerCountry,
    receiverId: !buyerIsSender ? order.buyerId : order.sellerId,
    ratings: faker.number.int({ min: 3, max: 5 }),
    comment: faker.lorem.sentence(),
  };
};
