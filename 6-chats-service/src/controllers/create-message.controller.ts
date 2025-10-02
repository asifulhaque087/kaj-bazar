import { handleAsync } from "@fvoid/shared-lib";
import { db } from "@src/drizzle/db";
import { MessagesTable } from "@src/drizzle/schemas";
import { gatewayClient } from "@src/sockets/gatewayClient";
import type { CreateMessageForm } from "@src/validations/message.validations";
import type { Request, Response } from "express";

const createMessage = async (req: Request, res: Response) => {
  const io = req.io!;

  const {
    conversationId,
    senderUsername,
    receiverUsername,
    senderPicture,
    receiverPicture,
    // buyerId,
    // sellerId,
    // optional
    hasOffer,
    body,
    offer,
    // file,
  } = req.body as CreateMessageForm;

  // ** Prepare data
  const messageData = {
    // buyerId,
    conversationId,
    receiverPicture,
    receiverUsername,
    // sellerId,
    senderPicture,
    senderUsername,
    hasOffer,
    body,
    offer: offer,
  };

  // console.log("message data is ", messageData);

  const message = await handleAsync(
    db
      .insert(MessagesTable)
      .values(messageData)
      .returning()
      .then((res) => res[0])
  );

  // Todo - We have to publish this message a an event
  // gatewayClient.emit("chatServiceNotification", message);
  io.emit("newMessage", message);
  // console.log("%%%%%%%%%%%% ", message);

  return res.json({ m: "Event send successfully" });
};

export default createMessage;
