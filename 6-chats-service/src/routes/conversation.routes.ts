import findOrCreateConversation from "@src/controllers/find-or-create-conversation.controller";
import { findOrCreateConversationSchema } from "@src/validations/conversation.validations";
import { Router } from "express";
import { validateData } from "@fvoid/shared-lib";
import getConversations from "@src/controllers/get-conversations.controller";
import getConversationById from "@src/controllers/conversation-by-id.controller";

const conversationRouter = Router();

conversationRouter.post(
  "/conversation/find-or-create",
  validateData(findOrCreateConversationSchema),
  findOrCreateConversation
);

conversationRouter.get(
  "/conversation/get-conversations/:username",
  getConversations
);

conversationRouter.get(
  "/conversation/get-conversation/:id",
  getConversationById
);

export default conversationRouter;
