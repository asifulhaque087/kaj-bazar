import { faker } from "@faker-js/faker";
import * as crypto from "node:crypto";
import {
  catchError,
  ConnectionError,
  Exchanges,
  Listener,
  Queues,
  RoutingKeys,
  type AuthSeedRequested,
} from "@fvoid/shared-lib";
import { hashPassword } from "@src/utils/hashing.util";
import type { ConsumeMessage } from "amqplib";
import { db } from "@src/db";
import { AuthTable } from "@src/schemas";
import { AuthSeedReturnedPublisher } from "@src/events/publishers/auth-seed-returned.publisher";

export class AuthSeedRequestedListener extends Listener<AuthSeedRequested> {
  exchangeName: Exchanges.AuthSeedRequested = Exchanges.AuthSeedRequested;
  queueName: Queues.AuthSeedRequested = Queues.AuthSeedRequested;
  routingKey: RoutingKeys.AuthSeedRequested = RoutingKeys.AuthSeedRequested;

  async onMessage(data: AuthSeedRequested["data"], message: ConsumeMessage) {
    const { count = 100 } = data;

    const authUsers = await seedAuth(count);

    const seededAuths = authUsers.map((user) => ({
      id: user.id,
      username: user.username,
      email: user.email,
      profilePublicId: user.profilePublicId,
      profilePicture: user.profilePicture,
      country: user.country as string | undefined,
    }));

    // ** --- publish an event ---
    new AuthSeedReturnedPublisher(this.channel).publish({
      authUsers: seededAuths,
    });

    this.channel.ack(message);
  }
}

// ** --- seed function ---

const seedAuth = async (count: number) => {
  const total = count;

  const [errAuth] = await catchError(db.delete(AuthTable));
  if (errAuth) throw new ConnectionError("Error Empty Auths !!");

  const authsToCreate = [];

  for (let i = 0; i < total; i++) {
    const authData = await createFakeAuth(i);
    authsToCreate.push(authData);
  }

  const insertedUsers = await db
    .insert(AuthTable)
    .values(authsToCreate)
    .returning();

  return insertedUsers;
};

const createFakeAuth = async (i: number) => ({
  id: faker.string.uuid(),
  username: `seed${i + 1}`,
  email: `seed${i + 1}@gmail.com`,
  profilePublicId: crypto.randomUUID(),
  password: await hashPassword("qwerty"),
  country: faker.location.country(),
  browserName: faker.internet.userAgent(),
  deviceType: faker.helpers.arrayElement(["desktop", "mobile", "tablet"]),
  profilePicture: faker.image.urlPicsumPhotos(),
  emailVerificationToken: crypto.randomBytes(20).toString("hex"),
  emailVerified: Math.random() < 0.5,
});
