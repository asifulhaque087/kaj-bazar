"use client";
import { useCreateMessage } from "@/api/chats";
import { createMessageDefaultForm } from "@/forms";
import {
  Buyer,
  createMessageForm,
  CreateMessageForm,
  Gig,
  Message,
} from "@/schemas";
import { useAuthStore } from "@/store/use-auth.store";
import { useChatStore } from "@/store/use-chat.store";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

// ** Types
interface IMiniChatRoom {
  gig: Gig;
  buyer: Buyer;
}

const MiniChatRoom = (props: IMiniChatRoom) => {
  // ** --- props ---
  const { gig, buyer } = props;

  // ** --- States ---
  const [message, setMessage] = useState("");

  // ** --- Mutation ---
  const { mutate: createMessage } = useCreateMessage();

  // ** --- Zustand Store ---
  const { messages, selectedConversation } = useChatStore();
  const { authUser } = useAuthStore();

  // ** --- Reference ---
  const dummy = useRef<HTMLSpanElement>(null);

  // ** --- Use form ---

  const form = useForm<CreateMessageForm>({
    resolver: zodResolver(createMessageForm),
    defaultValues: createMessageDefaultForm(null, null, null),
    // defaultValues: {sellerId: "hi"},
    mode: "onChange",
  });

  useEffect(() => {
    if (buyer && selectedConversation && gig) {
      form.reset(
        createMessageDefaultForm(selectedConversation?.id!, buyer, gig)
      );
    }
  }, [buyer, form, selectedConversation, gig]);

  // ** --- On Submit Message ---

  // const sendMessage = (e: FormEvent<HTMLFormElement>) => {
  const sendMessage = (data: CreateMessageForm) => {
    // e.preventDefault();

    console.log("data is ", data);

    createMessage(data);

    // return;

    // createMessage({
    //   // required
    //   conversationId: selectedConversation?.id!,
    //   senderUsername: authUser?.username!,
    //   receiverUsername: gig.username,
    //   senderPicture: authUser?.profilePicture!,
    //   receiverPicture: gig.profilePicture!,
    //   buyerId: authUser?.id!,
    //   sellerId: gig.sellerId,
    //   // optional
    //   body: message,
    // });

    form.reset();

    // setMessage("");

    if (dummy.current) {
      dummy.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="border absolute bottom-0 left-[50%] -translate-x-[50%] shadow-2xl  h-[400px] w-[300px] bg-green-500 rounded-tl-2xl rounded-tr-2xl p-[10px] flex flex-col justify-between">
        <main className="overflow-y-auto gray-scroll">
          <div className="flex flex-col gap-x-[20px]">
            {!!messages &&
              messages.map((msg) => <ChatMessage key={msg.id} {...msg} />)}
          </div>
          <span ref={dummy}></span>
        </main>

        <form onSubmit={form.handleSubmit(sendMessage)}>
          <input
            {...form.register("body")}
            name="body"
            placeholder="say something nice"
          />

          <button type="submit">🕊️</button>
        </form>
      </div>
    </>
  );
};

function ChatMessage(props: Message) {
  // const { text, uid, photoURL } = props;
  const { body, senderPicture, receiverPicture } = props;

  // const messageClass = uid === auth.currentUser.uid ? "sent" : "received";
  const messageClass = true ? "sent" : "received";

  return (
    <>
      <div className={`message ${messageClass}`}>
        <img
          src={
            // receiverPicture ||
            // senderPicture ||
            "https://api.adorable.io/avatars/23/abott@adorable.png"
          }
        />
        <p>{body}</p>
        <p>This is a message</p>
      </div>
    </>
  );
}

export default MiniChatRoom;
