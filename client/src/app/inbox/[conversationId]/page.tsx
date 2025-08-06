"use client";
import { useCreateMessage, useGetConversationsById } from "@/api/chats";
import { Button } from "@/components/ui/button";
import { DevTool } from "@hookform/devtools";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createMessageDefaultForm } from "@/forms";
import { createMessageForm, CreateMessageForm } from "@/schemas";
import { useAuthStore } from "@/store/use-auth.store";
import { useChatStore } from "@/store/use-chat.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon, XCircle } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useBrowser } from "@/hooks/use-browser.hook";
import { useSellerByName } from "@/api/sellers";
import { useBuyerByName } from "@/api/buyers";
import SendOfferModal from "@/components/send-offer-modal";

const page = () => {
  // ** --- Props ---

  // ** --- States ---
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isOfferModal, setIsOfferModal] = useState<boolean>(false);

  // ** --- Reference ---
  const dummy = useRef<HTMLSpanElement>(null);

  // ** --- Hooks ---
  const router = useRouter();
  const isbrowser = useBrowser();

  // ** --- Store ---
  const {
    messages,
    selectedConversation,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser, buyer, otherSeller, otherBuyer } = useAuthStore();

  // ** --- Params

  const searchParams = useSearchParams();
  const otherUser = searchParams.get("other") || "";
  const { conversationId } = useParams<{ conversationId: string }>();

  // ** --- Queries
  const { data: conversation } = useGetConversationsById({ conversationId });

  // ** --- Mutation ---
  const { mutate: createMessage } = useCreateMessage();

  const currentUserIsBuyer =
    conversation?.senderUsername === authUser?.username;

  const {} = useBuyerByName({
    isBuyer: currentUserIsBuyer,
    username: otherUser,
    authUser,
  });
  const {} = useSellerByName({
    isBuyer: currentUserIsBuyer,
    username: otherUser,
    authUser,
  });

  // ** --- Use form ---

  const form = useForm<CreateMessageForm>({
    resolver: zodResolver(createMessageForm),
    defaultValues: createMessageDefaultForm(null, null, null, null),
    mode: "onSubmit",
  });

  useEffect(() => {
    if (authUser && conversation && (otherBuyer || otherSeller)) {
      const hola = createMessageDefaultForm(
        authUser,
        conversation,
        otherSeller,
        otherBuyer
      );

      form.reset(hola);
    }
  }, [authUser, conversation, otherSeller, otherBuyer]);

  // console.log("the form is hola ", form.getValues());

  useEffect(() => {
    if (dummy.current) {
      dummy.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (!isbrowser) return;

  // console.log("errors are ", form.formState.errors);

  return (
    <div>
      <main className="flex flex-col gap-y-[10px]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={` ${
              msg.senderUsername === authUser?.username
                ? "self-end bg-blue-400"
                : "bg-red-300 self-start"
            }`}
          >
            {msg.body}
            {msg.hasOffer && msg.offer && (
              <div className="border p-2 mt-2 rounded">
                <strong>Offer:</strong>
                <p>Gig: {msg.offer.gigTitle}</p>
                <p>Price: ${msg.offer.price}</p>
                <p>Delivery: {msg.offer.deliveryInDays} days</p>
                <p>Description: {msg.offer.description}</p>
                {currentUserIsBuyer ? (
                  <div>
                    <Button
                      className="bg-green-500"
                      onClick={() => router.push(`/checkout/${msg.id}`)}
                    >
                      Accept
                    </Button>
                    <Button className="bg-red-500">Cancel</Button>
                  </div>
                ) : (
                  <Button className="bg-red-500">Cancel</Button>
                )}
              </div>
            )}
            {msg.file && (
              <div className="mt-2">
                <Image
                  src={msg.file}
                  alt="Attached file"
                  width={100}
                  height={100}
                  objectFit="cover"
                />
              </div>
            )}
          </div>
        ))}
        <span ref={dummy}></span>
      </main>

      {/* form */}

      <Form {...form}>
        <form
          id="create-message-form"
          onSubmit={form.handleSubmit(onSubmit)}
          // onSubmit={form.handleSubmit((data) => createMessage(data))}
          // onSubmit={form.handleSubmit((data) => console.log("data is ", data))}
          className="space-y-8 max-w-3xl w-full mx-auto py-10"
        >
          {/* body */}

          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Send a message" type="text" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <SendOfferModal
            showModal={isOfferModal}
            setShowModal={() => setIsOfferModal(false)}
            setValue={form.setValue}
            control={form.control}
            parentFormId="create-message-form"
          />

          {/* 
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="profile-picture-input">
                  <ImageIcon />
                </FormLabel>
                <FormControl>
                  <Input
                    className="hidden"
                    id="profile-picture-input" // Added an ID for direct access
                    type="file"
                    accept="image/*" // Accept only image files
                    onChange={handleFileChange}
                  />
                </FormControl>
                {imagePreview && (
                  <div className="mt-4 relative w-[100px] h-[100px]">
                    <p className="text-sm text-gray-500 mb-2">Image Preview:</p>
                    <Image
                      src={imagePreview}
                      alt="Profile Preview"
                      layout="fill" // Use fill for better image handling within a container
                      objectFit="cover"
                      className="rounded-md"
                    />
                    <Button
                      type="submit"
                      onClick={handleClearImage}
                      className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 rounded-full p-1 h-auto w-auto"
                      size="icon"
                    >
                      <XCircle className="h-4 w-4 text-white" />
                    </Button>
                  </div>
                )}
              </FormItem>
            )}
          /> */}

          {!currentUserIsBuyer && (
            <Button type="button" onClick={() => setIsOfferModal(true)}>
              send offer
            </Button>
          )}

          <Button type="submit">Submit</Button>
        </form>

        {/* <DevTool control={form.control} /> */}
      </Form>
    </div>
  );

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
        form.setValue("file", base64String); // Set the base64 string to the form field
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
      form.setValue("file", "");
    }
  }

  function handleClearImage() {
    setImagePreview(null);
    form.setValue("file", "");

    // ** IMPORTANT: Clear the file input's value directly
    const fileInput = document.getElementById(
      "profile-picture-input"
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = ""; // This clears the visually displayed file name
    }
  }

  function onSubmit(data: CreateMessageForm) {
    createMessage(data);

    // console.log("data is ", data);

    form.reset();

    // if (dummy.current) {
    //   dummy.current.scrollIntoView({ behavior: "smooth" });
    // }
  }
};

export default page;
