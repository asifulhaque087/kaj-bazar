// ** Third party imports
import type { Request, Response } from "express";
import { faker } from "@faker-js/faker";
import * as crypto from "node:crypto";
import { handleAsync } from "@fvoid/shared-lib";

// ** Utils
import { hashPassword } from "@src/utils/hashing.util";

// ** DB
import { db } from "@src/db";
import { AuthTable } from "@src/schemas";
import { RemoveBuyersPublisher } from "@src/events/publishers/remove-buyers.publisher";
import { mqWrapper } from "@src/rabbitmq-wrapper";
import { CreateBuyerPublisher } from "@src/events/publishers/create-buyer.publisher";

const seedAuth = async (req: Request, res: Response) => {
  const { count = "10" } = req.params;
  const total = parseInt(count);

  // Remove every users
  await handleAsync(db.delete(AuthTable));

  new RemoveBuyersPublisher(mqWrapper.channel).publish(null);

  // Crate an event so users service removes all the buyer

  for (let i = 0; i < total; i++) {
    // Prepare Data

    const authData = {
      username: `test${i + 1}`,
      email: `test${i + 1}@gmail.com`,
      profilePublicId: crypto.randomUUID(),
      password: await hashPassword("qwerty"),
      country: faker.location.country(),
      browserName: faker.internet.userAgent(),
      deviceType: faker.helpers.arrayElement(["desktop", "mobile", "tablet"]),
      profilePicture: faker.image.urlPicsumPhotos(),
      emailVerificationToken: crypto.randomBytes(20).toString("hex"),
      emailVerified: Math.random() < 0.5,
    };

    // Crate User

    const result = await handleAsync(
      db
        .insert(AuthTable)
        .values(authData)
        .returning()
        .then((res) => res[0])
    );

    // Send this to user service
    new CreateBuyerPublisher(mqWrapper.channel).publish({
      id: result?.id!,
      username: authData.username,
      email: authData.email,
      profilePublicId: authData.profilePublicId,
      profilePicture: authData.profilePicture,
      country: authData.country,
    });
  }
  return res.json({ message: "Seed users created successfully." });

  // res.json({ message: "I am from seed auth data" });
};

export default seedAuth;
