import { validateData } from "@fvoid/shared-lib";
import createMessage from "@src/controllers/create-message.controller";
import { createMessageForm } from "@src/validations/message.validations";
import { Router } from "express";

const messageRouter = Router();

messageRouter.post(
  "/message/create-message",
  validateData(createMessageForm),
  createMessage
);

export default messageRouter;
