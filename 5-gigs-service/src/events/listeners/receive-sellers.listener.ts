import { faker } from "@faker-js/faker";
import {
  Exchanges,
  handleAsync,
  Listener,
  Queues,
  RoutingKeys,
  type ReceiveSellersEvent,
} from "@fvoid/shared-lib";
import { db } from "@src/drizzle/db";
import { GigsTable } from "@src/drizzle/schema";
import type { ConsumeMessage } from "amqplib";
import { sample } from "lodash";

export class ReceiveSellerListener extends Listener<ReceiveSellersEvent> {
  exchangeName: Exchanges.Receive_Sellers = Exchanges.Receive_Sellers;
  queueName: Queues.Receive_Sellers = Queues.Receive_Sellers;
  routingKey: RoutingKeys.ReceiveSellers = RoutingKeys.ReceiveSellers;

  async onMessage(data: ReceiveSellersEvent["data"], message: ConsumeMessage) {
    const { count, sellers } = data;

    // ** --- Remove All Gigs ---
    await handleAsync(db.delete(GigsTable));

    const categories: string[] = [
      "Graphics & Design",
      "Digital Marketing",
      "Writing & Translation",
      "Video & Animation",
      "Music & Audio",
      "Programming & Tech",
      "Photography",
      "Data",
      "Business",
    ];
    const expectedDelivery: string[] = [
      "1 Day Delivery",
      "2 Days Delivery",
      "3 Days Delivery",
      "4 Days Delivery",
      "5 Days Delivery",
    ];

    // ** --- realistic ratings ---

    // const randomRatings = [
    //   { sum: 20, count: 4 },
    //   { sum: 10, count: 2 },
    //   { sum: 20, count: 4 },
    //   { sum: 15, count: 3 },
    //   { sum: 5, count: 1 },
    // ];

    const randomSeller = createUniqueRandomSelector(sellers);

    for (let i = 0; i < count; i++) {
      //   const sellerDoc = sellers[i];
      const sellerDoc = randomSeller();
      const title = `I will ${faker.word.words(5)}`;
      const basicTitle = faker.commerce.productName();
      const basicDescription = faker.commerce.productDescription();

      //   const rating = sample(randomRatings);

      const ratingData = generateRealisticRatingData(5, 50); // Gigs will have between 5 and 50 reviews

      // ** Preapare gig data
      const gig = {
        profilePicture: sellerDoc?.profilePicture!,
        sellerId: sellerDoc?.id!,
        email: sellerDoc?.email!,
        username: sellerDoc?.username!,
        title: title.length <= 80 ? title : title.slice(0, 80),
        basicTitle:
          basicTitle.length <= 40 ? basicTitle : basicTitle.slice(0, 40),
        basicDescription:
          basicDescription.length <= 100
            ? basicDescription
            : basicDescription.slice(0, 100),
        category: `${sample(categories)}`,
        subCategories: [
          faker.commerce.department(),
          faker.commerce.department(),
          faker.commerce.department(),
        ],
        description: faker.lorem.sentences({ min: 2, max: 4 }),
        tags: [
          faker.commerce.product(),
          faker.commerce.product(),
          faker.commerce.product(),
          faker.commerce.product(),
        ],
        price: parseInt(faker.commerce.price({ min: 20, max: 30, dec: 0 })),
        coverImage: faker.image.urlPicsumPhotos(),
        expectedDelivery: `${sample(expectedDelivery)}`,
        sortId: count + i + 1,
        ratingsCount: ratingData.ratingsCount,
        ratingSum: ratingData.ratingSum,
        ratingCategories: ratingData.ratingCategories,
      };

      //   ** --- insert into gig table ---

      const result = await handleAsync(
        db
          .insert(GigsTable)
          .values(gig)
          .returning()
          .then((res) => res[0])
      );
    }

    this.channel.ack(message);
  }
}
const createUniqueRandomSelector = <T>(items: T[]): (() => T | undefined) => {
  let availableItems: T[] = [...items];
  let originalItems: T[] = [...items];
  let selectedCount: number = 0;

  return function selectUniqueItem(): T | undefined {
    if (selectedCount === originalItems.length) {
      // All items have been selected, reset for a new cycle
      availableItems = [...originalItems];
      selectedCount = 0;
    }

    if (availableItems.length === 0) {
      // If for some reason availableItems is empty after reset, or initially empty
      return undefined;
    }

    const randomIndex: number = Math.floor(
      Math.random() * availableItems.length
    );
    const selectedItem: T | undefined = availableItems[randomIndex];

    // Remove the selected item to ensure uniqueness in the current cycle
    availableItems.splice(randomIndex, 1);
    selectedCount++;

    return selectedItem;
  };
};

interface RatingSystem {
  ratingsCount: number;
  ratingSum: number;
  ratingCategories: {
    five: { star: number; count: number };
    four: { star: number; count: number };
    three: { star: number; count: number };
    two: { star: number; count: number };
    one: { star: number; count: number };
  };
}

const generateRealisticRatingData = (
  minReviews: number,
  maxReviews: number
): RatingSystem => {
  const totalReviews = faker.number.int({
    min: minReviews,
    max: maxReviews,
  });

  const ratingCounts = {
    five: 0,
    four: 0,
    three: 0,
    two: 0,
    one: 0,
  };

  let currentRatingSum = 0;
  let currentRatingsCount = 0;

  for (let i = 0; i < totalReviews; i++) {
    // Bias towards higher ratings for more "successful" looking gigs
    // Adjust these weights as needed for desired distribution
    const rand = Math.random();
    let star: 1 | 2 | 3 | 4 | 5;

    if (rand < 0.6) {
      // 60% chance for 5 stars
      star = 5;
    } else if (rand < 0.85) {
      // 25% chance for 4 stars (0.85 - 0.6 = 0.25)
      star = 4;
    } else if (rand < 0.95) {
      // 10% chance for 3 stars (0.95 - 0.85 = 0.10)
      star = 3;
    } else if (rand < 0.98) {
      // 3% chance for 2 stars (0.98 - 0.95 = 0.03)
      star = 2;
    } else {
      // 2% chance for 1 star
      star = 1;
    }

    switch (star) {
      case 5:
        ratingCounts.five++;
        break;
      case 4:
        ratingCounts.four++;
        break;
      case 3:
        ratingCounts.three++;
        break;
      case 2:
        ratingCounts.two++;
        break;
      case 1:
        ratingCounts.one++;
        break;
    }
    currentRatingSum += star;
    currentRatingsCount++;
  }

  return {
    ratingsCount: currentRatingsCount,
    ratingSum: currentRatingSum,
    ratingCategories: {
      five: { star: 5, count: ratingCounts.five },
      four: { star: 4, count: ratingCounts.four },
      three: { star: 3, count: ratingCounts.three },
      two: { star: 2, count: ratingCounts.two },
      one: { star: 1, count: ratingCounts.one },
    },
  };
};
