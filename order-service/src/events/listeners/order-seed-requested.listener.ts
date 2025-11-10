import { faker } from "@faker-js/faker";
import {
  catchError,
  ConnectionError,
  Exchanges,
  Listener,
  Queues,
  RoutingKeys,
  type OrderSeedRequested,
} from "@fvoid/shared-lib";
import { db } from "@src/db";
import { OrderSeedReturnedPublisher } from "@src/events/publishers/order-seed-returned.publisher";
import { OrdersTable } from "@src/schemas";
import type { ConsumeMessage } from "amqplib";

// ** --- types ---

interface Buyer {
  id: string;
  profilePicture: string;
  username: string;
  isSeller: boolean;
  email: string;
  country?: string;
}

interface Gig {
  id: string;
  title: string;
  basicTitle: string;
  description: string;
  basicDescription: string;
  coverImage: string;
  expectedDelivery: string;
}

interface Message {
  id: string;
  gigId: string;
  senderUsername: string;
  receiverUsername: string;
  hasOffer: boolean;
  offerAccepted: boolean;
}

export class OrderSeedRequestedListener extends Listener<OrderSeedRequested> {
  exchangeName: Exchanges.OrderSeedRequested = Exchanges.OrderSeedRequested;
  queueName: Queues.OrderSeedRequested = Queues.OrderSeedRequested;
  routingKey: RoutingKeys.OrderSeedRequested = RoutingKeys.OrderSeedRequested;

  async onMessage(data: OrderSeedRequested["data"], message: ConsumeMessage) {
    const { buyers, gigs, messages } = data;

    const sellers = buyers.filter((b) => b.isSeller);

    const orders = await seedOrder(buyers, sellers, gigs, messages);

    if (!orders) throw new ConnectionError("something went wrong");

    const newOrders = orders.map((order) => ({
      id: order.id,
      gigId: order.gig.id,
      gigImage: order.gig.coverImage,
      gigTitle: order.gig.title,

      buyerId: order.buyer.id,
      buyerUsername: order.buyer.username,
      buyerProfilePicture: order.buyer.profilePicture,
      buyerCountry: order.buyer.country as string | undefined,

      sellerId: order.seller.id,
      sellerUsername: order.seller.username,
      sellerProfilePicture: order.seller.profilePicture,
      sellerCountry: order.seller.country as string | undefined,
    }));

    // ** --- publish an event ---
    new OrderSeedReturnedPublisher(this.channel).publish({
      orders: newOrders,
    });

    this.channel.ack(message);
  }
}

// ** --- seed function ---

const tablesToDelete = [{ table: OrdersTable, name: "Orders" }];

const seedOrder = async (
  buyers: Buyer[],
  sellers: Buyer[],
  gigs: Gig[],
  messages: Message[]
) => {
  // ** --- Remove All Tables of Chat service ---
  for (const { table, name } of tablesToDelete) {
    const [err] = await catchError(db.delete(table));
    if (err) throw new ConnectionError(`Error Empty ${name} !!`);
  }

  // 1 - find all the messages that has offer and accepted === true

  // 2 - loop through all the messages list

  // 3 - find the buyer & seller and gig of each message inside loop | message er sender diye seller ber korte hobe r receiver diye buyer ber korte hobe. karon amra jani offer sudu seller create korte pare. tarmane ai message a offer ase oi message er sender holo seller. R ata amra confirm korte pari, karon chat service a message a offer create korsi jodi buyer.isSeller === true hoi. r offer er gigId diye gig o ber korte pari.

  // 4 - generate order from those data

  const offerMessages = messages.filter(
    (msg) => msg.hasOffer && msg.offerAccepted
  );

  const ordersToCreate: any[] = [];

  for (let i = 0; i < offerMessages.length; i++) {
    const offerMessage = offerMessages[i];
    if (!offerMessage) continue;

    const offerMsgBuyer = buyers.find(
      (brs) => brs.username === offerMessage.receiverUsername
    );
    const offerMsgSeller = sellers.find(
      (slrs) => slrs.username === offerMessage.senderUsername
    );
    const offerMsgGig = gigs.find((gig) => gig.id === offerMessage.gigId);

    if (!offerMessage || !offerMsgBuyer || !offerMsgSeller || !offerMsgGig)
      continue;

    const orderId = generateId();

    ordersToCreate.push(
      createFakeOrder(
        orderId,
        offerMessage,
        offerMsgBuyer,
        offerMsgSeller,
        offerMsgGig
      )
    );
  }

  // const messageBuyer = offerMessages.map(())

  const [errOrders, insertedOrders] = await catchError(
    db.insert(OrdersTable).values(ordersToCreate).returning()
  );

  if (errOrders) throw new ConnectionError("Error inserting orders !!");

  return insertedOrders;
};

const createFakeOrder = (
  orderId: string,
  message: Message,
  buyer: Buyer,
  seller: Buyer,
  gig: Gig
) => {
  const orderGig = {
    id: gig.id,
    title: gig.title,
    basicTitle: gig.basicTitle,
    description: gig.description,
    basicDescription: gig.basicDescription,
    coverImage: gig.coverImage,
  };

  const orderBuyer = {
    id: buyer.id,
    username: buyer.username,
    email: buyer.email,
    profilePicture: buyer.profilePicture,
    country: buyer.country,
  };

  const orderSeller = {
    id: seller.id,
    username: seller.username,
    email: seller.email,
    profilePicture: seller.profilePicture,
    country: seller.country,
  };

  const orderStatus = faker.helpers.arrayElement(
    ["incomplete", "progress", "complete"].filter((s) => s !== "incomplete")
  );
  const accepted = faker.helpers.arrayElement([false, true]);
  const deliveryInDays = parseInt(gig.expectedDelivery.split(" ")[0]!);

  // orderStatus: faker.helpers.arrayElement(
  //   orderStatuses.filter((s) => s !== "incomplete")
  // ),

  return {
    id: orderId,
    messageId: message.id,
    paymentIntent: `pi_${faker.string.uuid()}`,

    price: faker.number.int({ min: 5, max: 100 }),
    gig: orderGig,
    buyer: orderBuyer,
    seller: orderSeller,
    deliveryDueDate: faker.date.soon({ days: deliveryInDays + 5 }),

    // ** Optional

    deliveryInDays: deliveryInDays, //todo - atake delivery due date er soman korte hobe
    orderStatus: orderStatus,

    placeOrderAt: faker.date.past({ years: 1 }),
    // requirement
    requirement: faker.lorem.paragraph(),
    requirementAt: faker.date.recent({ days: 10 }),
    orderStartedAt: faker.date.recent({ days: 8 }),

    // requestExtensions: jsonb("request_extensions").$type<ExtensionRequest[]>(),

    // delivery
    orderDeliveredAt:
      orderStatus === "complete" ? faker.date.recent({ days: 3 }) : undefined,
    deliveredWorks:
      orderStatus === "complete"
        ? [{ message: faker.lorem.sentence(), file: faker.internet.url() }]
        : undefined,

    accepted: orderStatus !== "complete" ? false : accepted,
    acceptedAt: accepted ? faker.date.recent({ days: 1 }) : null,
  };
};

const generateId = () => faker.string.uuid();
