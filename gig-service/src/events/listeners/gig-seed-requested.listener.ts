import { faker } from "@faker-js/faker";
import {
  catchError,
  ConnectionError,
  createUniqueRandomSelector,
  Exchanges,
  Listener,
  Queues,
  RoutingKeys,
  type GigSeedRequested,
} from "@fvoid/shared-lib";
import type { ConsumeMessage } from "amqplib";
import { db } from "@src/db";
import { GigSeedReturnedPublisher } from "@src/events/publishers/gig-seed-returned.publisher";
import { GigsTable } from "@src/schemas";
import { GigCountUpdateRequestedPublisher } from "@src/events/publishers/gig-count-update-requested.publisher";

interface Buyer {
  id: string;
  profilePicture: string;
  username: string;
  isSeller: boolean;
  email: string;
  country?: string;
}

export class GigSeedRequestedListener extends Listener<GigSeedRequested> {
  exchangeName: Exchanges.GigSeedRequested = Exchanges.GigSeedRequested;
  queueName: Queues.GigSeedRequested = Queues.GigSeedRequested;
  routingKey: RoutingKeys.GigSeedRequested = RoutingKeys.GigSeedRequested;

  async onMessage(data: GigSeedRequested["data"], message: ConsumeMessage) {
    const { buyers } = data;

    const sellers = buyers.filter((b) => b.isSeller);

    const gigs = await seedGig(sellers);

    if (!gigs) throw new ConnectionError("something went wrong");

    const newGigs = gigs.map((gig) => ({
      id: gig.id,
      username: gig.username,
      title: gig.title,
      basicTitle: gig.basicTitle,
      description: gig.description,
      basicDescription: gig.basicDescription,
      coverImage: gig.coverImage,
      expectedDelivery: gig.expectedDelivery,
    }));

    // ** --- publish an event ---

    new GigCountUpdateRequestedPublisher(this.channel).publish({
      gigs: gigs.map((gig) => ({
        id: gig.id,
        sellerId: gig.sellerId,
        title: gig.title,
      })),
    });

    new GigSeedReturnedPublisher(this.channel).publish({
      gigs: newGigs,
      buyers,
    });

    this.channel.ack(message);
  }
}

// ** --- seed function ---

const seedGig = async (sellers: Buyer[]) => {
  // ** --- Remove All Gigs ---
  const tablesToDelete = [{ table: GigsTable, name: "Gigs" }];

  for (const { table, name } of tablesToDelete) {
    const [err] = await catchError(db.delete(table));
    if (err) throw new ConnectionError(`Error Empty ${name} !!`);
  }

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

  const randomSeller = createUniqueRandomSelector(sellers);

  const gigs = [];

  for (let i = 0; i < sellers.length * 20; i++) {
    //   const sellerDoc = sellers[i];
    const sellerDoc = randomSeller();
    const title = `I will ${faker.word.words(5)}`;
    const basicTitle = faker.commerce.productName();
    const basicDescription = faker.commerce.productDescription();

    //   const rating = sample(randomRatings);

    // ** Preapare gig data
    const gig = {
      id: faker.string.uuid(),
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
      category: faker.helpers.arrayElement(categories),
      subCategories: [
        { title: faker.commerce.department() },
        { title: faker.commerce.department() },
        { title: faker.commerce.department() },
      ],
      description: faker.lorem.sentences({ min: 2, max: 4 }),
      tags: [
        { title: faker.commerce.product() },
        { title: faker.commerce.product() },
        { title: faker.commerce.product() },
      ],
      price: parseInt(faker.commerce.price({ min: 20, max: 30, dec: 0 })),
      coverImage: faker.image.urlPicsumPhotos(),
      expectedDelivery: faker.helpers.arrayElement(expectedDelivery),
    };

    gigs.push(gig);
  }

  const [errGigs, insertedGigs] = await catchError(
    db.insert(GigsTable).values(gigs).returning()
  );

  if (errGigs) throw new ConnectionError("Error inserting gigs !!");

  return insertedGigs;
};
