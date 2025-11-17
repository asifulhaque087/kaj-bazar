import { faker } from "@faker-js/faker";
import {
  catchError,
  ConnectionError,
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

interface User {
  id: string;
  profilePicture: string;
  username: string;
  isSeller: boolean;
  email: string;
  country?: string;
}

interface ConversationInsert {
  id: string;
  senderUsername: string;
  senderProfilePhoto: string;
  receiverUsername: string;
  receiverProfilePhoto: string;
}

interface OfferInsert {
  gigTitle: string;
  gigId: string;
  price: number;
  description: string;
  deliveryInDays: number;
  // ** optional
  oldDeliveryDate?: string;
  newDeliveryDate?: string;
  accepted?: boolean;
  cancelled?: boolean;
}

interface MessageInsert {
  id: string;
  conversationId: string;
  senderUsername: string;
  receiverUsername: string;
  senderPicture: string;
  receiverPicture: string;
  body: string;
  isRead: boolean;
  hasOffer: boolean;
  offer: OfferInsert; // Use 'any' here or define Offer interface properly if inserting JSONB
}
// --- Constants ---
const MIN_CONVERSATIONS_PER_USER = 3;
const BATCH_SIZE = 300;

// --- Helper Functions ---

/**
 * Determines the starting sender based on the conversation rules.
 */
function determineInitialSender(
  userA: User,
  userB: User
): { sender: User; receiver: User } {
  const isASeller = userA.isSeller;
  const isBSeller = userB.isSeller;

  // Rule 1: Buyer communicating with Seller
  if (!isASeller && isBSeller) {
    // A is Buyer, B is Seller
    return { sender: userA, receiver: userB };
  }
  if (isASeller && !isBSeller) {
    // A is Seller, B is Buyer
    // Note: The conversation *must* start with the Buyer
    return { sender: userB, receiver: userA };
  }

  // Rule 2: Seller communicating with Seller (Sender can be either)
  if (isASeller && isBSeller) {
    // Randomly pick one seller to be the initial sender
    // return faker.datatype.boolean()
    //   ? { sender: userA, receiver: userB }
    //   : { sender: userB, receiver: userA };

    return { sender: userA, receiver: userB };
  }

  // Buyer communicating with Buyer (Though not explicitly required, must handle)
  // Randomly pick one buyer to be the initial sender
  return faker.datatype.boolean()
    ? { sender: userA, receiver: userB }
    : { sender: userB, receiver: userA };
}

/**
 * Generates a message for a given conversation, with rules for offers.
 */
function createMessage(
  conversationId: string,
  user1: User, // The first user in the pair
  user2: User, // The second user in the pair
  messages: MessageInsert[],
  gigs: Gig[],
  isInitialMessage: boolean
): MessageInsert {
  // seller  1 jodi conversation start kore tahole seller 1 e protome text korbe.

  const isBothSeller = user1.isSeller && user2.isSeller;

  // Randomly determine who sends the current message, ensuring conversation flow.
  let messageSender = faker.datatype.boolean() ? user1 : user2;
  let messageReceiver =
    messageSender.username === user1.username ? user2 : user1;

  if (isInitialMessage) {
    messageSender = user1;
    messageReceiver = user2;
  }

  // Rule 3: Only seller can send message offer
  const hasOffer =
    messageSender.isSeller && faker.datatype.boolean({ probability: 0.7 }); // 70% chance for a seller message to be an offer

  if (isBothSeller) {
    const firstOfferMsg = messages.find((msg) => {
      ((msg.senderUsername === user1.username &&
        msg.receiverUsername === user2.username) ||
        (msg.senderUsername === user2.username &&
          msg.receiverUsername === user1.username)) &&
        msg.hasOffer;
    });

    if (!firstOfferMsg) {
      messageSender = user2;
      messageReceiver = user1;
    }
  }

  let offerData = {};
  if (hasOffer) {
    const sellergigs = gigs.filter(
      (gig) => gig.username === messageSender.username
    );

    const gig = faker.helpers.arrayElement(sellergigs);
    offerData = {
      gigTitle: gig.title,
      gigId: gig.id,
      price: faker.number.int({ min: 5, max: 100 }),
      description: gig.description,
      deliveryInDays: gig.expectedDelivery,
      accepted: faker.datatype.boolean({ probability: 0.8 }),
      cancelled: false,
    };
  }

  // Ensure the initial message is a regular text message for a natural start
  const bodyText = isInitialMessage
    ? "Hi, I saw your profile and I'm interested in working with you."
    : faker.lorem.sentence({ min: 5, max: 15 });

  return {
    id: faker.string.uuid(),
    conversationId,
    senderUsername: messageSender.username,
    receiverUsername: messageReceiver.username,
    senderPicture: messageSender.profilePicture,
    receiverPicture: messageReceiver.profilePicture,
    body: bodyText,
    hasOffer,
    offer: offerData as OfferInsert, // Cast for JSONB
    isRead: faker.datatype.boolean({ probability: 0.9 }),
  };
}

function generateGuaranteedPairs(
  users: User[],
  minConvos: number
): [User, User][] {
  const pairs: [User, User][] = [];
  const existing = new Set<string>();

  const pairKey = (a: string, b: string) => [a, b].sort().join("-");

  // A Set to track the partners already chosen for the current 'user'
  // during their loop iteration. This prevents selecting the same partner twice.
  const currentPartners = new Set<string>();

  for (const user of users) {
    // 1. Reset tracking for the current user
    currentPartners.clear();

    // 2. Loop until the guarantee is met
    while (currentPartners.size < minConvos) {
      // Get all potential partners (excluding self and partners already tracked in this loop)
      const potentialPartners = users.filter(
        (u) =>
          // 1. Not the user themselves
          u.username !== user.username &&
          // 2. Not already counted toward the current user's minConvos goal
          !currentPartners.has(u.username) &&
          // 3. UPDATED BUSINESS RULE: Must contain at least one seller.
          //    This means we only REJECT the pair if BOTH users are buyers (isSeller: false).
          !(u.isSeller === false && user.isSeller === false)
      );

      // Check if we ran out of unique potential partners
      if (potentialPartners.length === 0) {
        // We cannot satisfy the minConvos for this user. Break the while loop.
        // The guarantee only holds if 'Total Users - 1 >= minConvos'.
        console.warn(
          `Cannot guarantee ${minConvos} conversations for user ${user.username}. Only reached ${currentPartners.size}.`
        );
        break;
      }

      // Randomly select one new partner from the remaining potential partners
      // We use faker.helpers.shuffle to get a random partner
      const partner = faker.helpers.shuffle(potentialPartners)[0]!;

      // if(!partner) break

      const key = pairKey(user.username, partner.username);

      // 3. Uniqueness Check and Pairing
      if (!existing.has(key)) {
        // This is a NEW unique pair overall (A-B vs B-A)
        existing.add(key);
        pairs.push([user, partner]);
      }

      // 4. Update the tracking for the current user
      // Even if the pair was already added by the partner (e.g., Bob added Alice),
      // we need to count it for the *current* user's minimum count (Alice).
      // We use the partner's username, not the key, for this local tracking.
      currentPartners.add(partner.username);
    }
  }

  return pairs;
}

export class ChatSeedRequestedListener extends Listener<ChatSeedRequested> {
  exchangeName: Exchanges.ChatSeedRequested = Exchanges.ChatSeedRequested;
  queueName: Queues.ChatSeedRequested = Queues.ChatSeedRequested;
  routingKey: RoutingKeys.ChatSeedRequested = RoutingKeys.ChatSeedRequested;

  async onMessage(data: ChatSeedRequested["data"], message: ConsumeMessage) {
    const { buyers, gigs } = data;

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

const seedChat = async (allUsers: User[], gigs: Gig[]) => {
  // ** --- Remove All Tables of Chat service ---
  for (const { table, name } of tablesToDelete) {
    const [err] = await catchError(db.delete(table));
    if (err) throw new ConnectionError(`Error Empty ${name} !!`);
  }

  const conversationsToInsert: ConversationInsert[] = [];
  const messagesToInsert: MessageInsert[] = [];

  const pairs = generateGuaranteedPairs(allUsers, MIN_CONVERSATIONS_PER_USER);

  // 3. Create conversation + messages
  for (const [user1, user2] of pairs) {
    const { sender, receiver } = determineInitialSender(user1, user2);

    const conversationId = faker.string.uuid();

    conversationsToInsert.push(
      createFakeConversation(conversationId, sender, receiver)
    );

    // Initial + follow-ups
    messagesToInsert.push(
      createMessage(
        conversationId,
        sender,
        receiver,
        messagesToInsert,
        gigs,
        true
      )
    );
    const numFollowUp = faker.number.int({ min: 20, max: 30 });
    for (let i = 0; i < numFollowUp; i++) {
      messagesToInsert.push(
        createMessage(
          conversationId,
          user1,
          user2,
          messagesToInsert,
          gigs,
          false
        )
      );
    }
  }

  // 4. Batch insert
  console.log(`💬 Inserting ${conversationsToInsert.length} conversations...`);
  for (let i = 0; i < conversationsToInsert.length; i += BATCH_SIZE) {
    await db
      .insert(ConversationsTable)
      .values(conversationsToInsert.slice(i, i + BATCH_SIZE));
  }

  console.log(`✉️ Inserting ${messagesToInsert.length} messages...`);
  for (let i = 0; i < messagesToInsert.length; i += BATCH_SIZE) {
    await db
      .insert(MessagesTable)
      .values(messagesToInsert.slice(i, i + BATCH_SIZE));
  }

  return messagesToInsert;
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
