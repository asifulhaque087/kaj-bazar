import findOrCreateConversation from "@src/controllers/find-or-create-conversation.controller";
import { findOrCreateConversationSchema } from "@src/validations/conversation.validations";
import { Router } from "express";
import { validateData } from "@fvoid/shared-lib";

const conversationRouter = Router();

conversationRouter.post(
  "/conversation/find-or-create",
  validateData(findOrCreateConversationSchema),
  findOrCreateConversation
);

export default conversationRouter;
