import { faker } from "@faker-js/faker";
import {
  catchError,
  ConnectionError,
  createUniqueRandomSelector,
  Exchanges,
  Listener,
  Queues,
  RoutingKeys,
  type ChatSeedRequested,
} from "@fvoid/shared-lib";
import type { ConsumeMessage } from "amqplib";
import { db } from "@src/db";
import { ChatSeedReturnedPublisher } from "@src/events/publishers/chat-seed-returned.publisher";
import { ConversationsTable, MessagesTable } from "@src/schemas";

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
  username: string;
  basicTitle: string;
  description: string;
  basicDescription: string;
  coverImage: string;
  expectedDelivery: string;
}

export class ChatSeedRequestedListener extends Listener<ChatSeedRequested> {
  exchangeName: Exchanges.ChatSeedRequested = Exchanges.ChatSeedRequested;
  queueName: Queues.ChatSeedRequested = Queues.ChatSeedRequested;
  routingKey: RoutingKeys.ChatSeedRequested = RoutingKeys.ChatSeedRequested;

  async onMessage(data: ChatSeedRequested["data"], message: ConsumeMessage) {
    const { buyers, gigs } = data;

    // console.log("@@@@@@@@@@@@@@@@ ", gigs);

    // const sellers = buyers.filter((b) => b.isSeller);

    const messages = await seedChat(buyers, gigs);

    if (!messages) throw new ConnectionError("something went wrong");

    const newMessages = messages.map((msg) => ({
      id: msg.id,
      gigId: msg.offer?.gigId!,
      hasOffer: msg.hasOffer ? msg.hasOffer : false,
      offerAccepted: msg.offer?.accepted!,
      senderUsername: msg.senderUsername,
      receiverUsername: msg.receiverUsername,
    }));

    // ** --- publish an event ---
    new ChatSeedReturnedPublisher(this.channel).publish({
      buyers,
      gigs,
      messages: newMessages,
    });

    this.channel.ack(message);
  }
}

// ** --- seed function ---

const tablesToDelete = [
  { table: ConversationsTable, name: "Conversations" },
  { table: MessagesTable, name: "Messages" },
];

const seedChat = async (buyers: Buyer[], gigs: Gig[]) => {
  // ** --- Remove All Tables of Chat service ---
  for (const { table, name } of tablesToDelete) {
    const [err] = await catchError(db.delete(table));
    if (err) throw new ConnectionError(`Error Empty ${name} !!`);
  }

  const onlyBuyers = buyers.filter((b) => b.isSeller === false);
  const onlySellers = buyers.filter((b) => b.isSeller);

  // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ hello ", buyers);

  const randomBuyer = createUniqueRandomSelector(onlyBuyers);
  const randomSeller = createUniqueRandomSelector(onlySellers);

  // conversation create korte hobe. er jonno 2 jon alada user lagbe. make sure korte hobe er modde akjon seller, r arekjon seller o hote pare abar buyer o hote pare.

  const conversationsToCreate = [];
  const messagesToCreate = [];

  for (let j = 0; j < 50; j++) {
    const buyerForCon = randomBuyer();
    const sellerForCon = randomSeller();

    // console.log(
    //   "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ hello ",
    //   buyerForCon,
    //   sellerForCon
    // );

    if (!buyerForCon || !sellerForCon) continue;

    // tarpore tader jonno akta conversation create korte hobe
    const convId = faker.string.uuid();

    conversationsToCreate.push(
      createFakeConversation(convId, buyerForCon, sellerForCon)
    );

    const hello = createFakeConversation(convId, buyerForCon, sellerForCon);

    // Add a few back-and-forth messages
    for (let j = 0; j < faker.number.int({ min: 2, max: 25 }); j++) {
      const sender = j % 2 === 0 ? buyerForCon : sellerForCon;
      const receiver = j % 2 === 0 ? sellerForCon : buyerForCon;

      // akhane buyer er user name diye kno gig create hoini tai buyer sender holeo ultimately sellerGigsa empty array assign hobe karon kno gig er sathe buyer er user id match korbena.
      const sellergigs = gigs.filter((gig) => gig.username === sender.username);

      messagesToCreate.push(
        createFakeMessage(convId, sender, receiver, sellergigs)
      );
    }
  }

  // console.log(
  //   "@@@@@@@@@@@@@@@@@@@@ conversationsToCreate ",
  //   conversationsToCreate
  // );
  // console.log("@@@@@@@@@@@@@@@@@@@@ messagesToCreate ", messagesToCreate);

  const [errConv] = await catchError(
    db.insert(ConversationsTable).values(conversationsToCreate).returning()
  );

  if (errConv) throw new ConnectionError("Error inserting conversations !!");

  const [errMsgs, insertedMsgs] = await catchError(
    db.insert(MessagesTable).values(messagesToCreate).returning()
  );

  if (errMsgs) throw new ConnectionError("Error inserting messages !!");

  return insertedMsgs;
};

const createFakeConversation = (
  convId: string,
  buyer: Buyer,
  seller: Buyer
) => {
  return {
    id: convId,
    senderUsername: buyer.username,
    senderProfilePhoto: buyer.profilePicture,
    receiverUsername: seller.username,
    receiverProfilePhoto: seller.profilePicture,
  };
};

const createFakeMessage = (
  conversationId: string,
  sender: any,
  receiver: any,
  gigs: any[]
) => {
  const hasOffer = faker.datatype.boolean({ probability: 0.2 });
  let offerData = MessagesTable.offer.default;

  if (sender.isSeller && hasOffer) {
    const gig = faker.helpers.arrayElement(gigs);
    offerData = {
      gigTitle: gig.title,
      gigId: gig.id,
      price: gig.price,
      description: gig.description,
      deliveryInDays: gig.expectedDelivery,
      accepted: faker.datatype.boolean({ probability: 0.1 }),
      cancelled: false,
    };
  }

  return {
    conversationId,
    senderUsername: sender.username,
    receiverUsername: receiver.username,
    senderPicture: sender.profilePicture,
    receiverPicture: receiver.profilePicture,
    body: faker.lorem.sentence(),
    hasOffer,
    offer: offerData as any, // Cast for JSONB
    isRead: faker.datatype.boolean({ probability: 0.9 }),
  };
};
