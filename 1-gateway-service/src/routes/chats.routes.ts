import { config } from "@src/config";
import createMessage from "@src/controllers/chats/create-message.controller";
import findOrCreateConversation from "@src/controllers/chats/find-or-create-conversation.controller";
import { apiMiddleware } from "@src/middlewares/api.middleware";
import { verifyJwtToken } from "@src/middlewares/verify-jwt.middleware";
import { Router } from "express";

const chatRouter = Router();

chatRouter.use(apiMiddleware(`${config.CHAT_BASE_URL}/api/v1/chats`, "chats"));

// gigRouter.get("/search/:from/:size/:type", searchGig);
// gigRouter.get("/search", searchGig);
// gigRouter.get("/:gigId", getGigById);

chatRouter.post(
  "/conversation/find-or-create",
  verifyJwtToken,
  findOrCreateConversation
);

chatRouter.post("/message/create-message", verifyJwtToken, createMessage);

export default chatRouter;
