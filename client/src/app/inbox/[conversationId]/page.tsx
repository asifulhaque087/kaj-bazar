// "use client";
// import { useCreateMessage, useGetConversationsById } from "@/api/chats";
// import { Button } from "@/components/ui/button";
// import { DevTool } from "@hookform/devtools";

// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { createMessageDefaultForm } from "@/forms";
// import { createMessageForm, CreateMessageForm } from "@/schemas";
// import { useAuthStore } from "@/store/use-auth.store";
// import { useChatStore } from "@/store/use-chat.store";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { ImageIcon, XCircle } from "lucide-react";
// import Image from "next/image";
// import { useParams, useRouter, useSearchParams } from "next/navigation";
// import React, { ChangeEvent, useEffect, useRef, useState } from "react";
// import { useForm } from "react-hook-form";
// import { useBrowser } from "@/hooks/use-browser.hook";
// import { useSellerByName } from "@/api/sellers";
// import { useBuyerByName } from "@/api/buyers";
// import SendOfferModal from "@/components/send-offer-modal";

// const page = () => {
//   // ** --- Props ---

//   // ** --- States ---
//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const [isOfferModal, setIsOfferModal] = useState<boolean>(false);

//   // ** --- Reference ---
//   const dummy = useRef<HTMLSpanElement>(null);

//   // ** --- Hooks ---
//   const router = useRouter();
//   const isbrowser = useBrowser();

//   // ** --- Store ---
//   const {
//     messages,
//     selectedConversation,
//     subscribeToMessages,
//     unsubscribeFromMessages,
//   } = useChatStore();
//   const { authUser, buyer, otherSeller, otherBuyer } = useAuthStore();

//   // ** --- Params

//   const searchParams = useSearchParams();
//   const otherUser = searchParams.get("other") || "";
//   const { conversationId } = useParams<{ conversationId: string }>();

//   // ** --- Queries
//   const { data: conversation } = useGetConversationsById({ conversationId });

//   // ** --- Mutation ---
//   const { mutate: createMessage } = useCreateMessage();

//   const currentUserIsBuyer =
//     conversation?.senderUsername === authUser?.username;

//   const {} = useBuyerByName({
//     isBuyer: currentUserIsBuyer,
//     username: otherUser,
//     authUser,
//   });
//   const {} = useSellerByName({
//     isBuyer: currentUserIsBuyer,
//     username: otherUser,
//     authUser,
//   });

//   // ** --- Use form ---

//   const form = useForm<CreateMessageForm>({
//     resolver: zodResolver(createMessageForm),
//     defaultValues: createMessageDefaultForm(null, null, null, null),
//     mode: "onSubmit",
//   });

//   useEffect(() => {
//     if (authUser && conversation && (otherBuyer || otherSeller)) {
//       const hola = createMessageDefaultForm(
//         authUser,
//         conversation,
//         otherSeller,
//         otherBuyer
//       );

//       form.reset(hola);
//     }
//   }, [authUser, conversation, otherSeller, otherBuyer]);

//   // console.log("the form is hola ", form.getValues());

//   useEffect(() => {
//     if (dummy.current) {
//       dummy.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages]);

//   if (!isbrowser) return;

//   // console.log("errors are ", form.formState.errors);

//   return (
//     <div>
//       <main className="flex flex-col gap-y-[10px]">
//         {messages.map((msg) => (
//           <div
//             key={msg.id}
//             className={` ${
//               msg.senderUsername === authUser?.username
//                 ? "self-end bg-blue-400"
//                 : "bg-red-300 self-start"
//             }`}
//           >
//             {msg.body}
//             {msg.hasOffer && msg.offer && (
//               <div className="border p-2 mt-2 rounded">
//                 <strong>Offer:</strong>
//                 <p>Gig: {msg.offer.gigTitle}</p>
//                 <p>Price: ${msg.offer.price}</p>
//                 <p>Delivery: {msg.offer.deliveryInDays} days</p>
//                 <p>Description: {msg.offer.description}</p>
//                 {currentUserIsBuyer ? (
//                   <div>
//                     <Button
//                       className="bg-green-500"
//                       onClick={() => router.push(`/checkout/${msg.id}`)}
//                     >
//                       Accept
//                     </Button>
//                     <Button className="bg-red-500">Cancel</Button>
//                   </div>
//                 ) : (
//                   <Button className="bg-red-500">Cancel</Button>
//                 )}
//               </div>
//             )}
//             {msg.file && (
//               <div className="mt-2">
//                 <Image
//                   src={msg.file}
//                   alt="Attached file"
//                   width={100}
//                   height={100}
//                   objectFit="cover"
//                 />
//               </div>
//             )}
//           </div>
//         ))}
//         <span ref={dummy}></span>
//       </main>

//       {/* form */}

//       <Form {...form}>
//         <form
//           id="create-message-form"
//           onSubmit={form.handleSubmit(onSubmit)}
//           // onSubmit={form.handleSubmit((data) => createMessage(data))}
//           // onSubmit={form.handleSubmit((data) => console.log("data is ", data))}
//           className="space-y-8 max-w-3xl w-full mx-auto py-10"
//         >
//           {/* body */}

//           <FormField
//             control={form.control}
//             name="body"
//             render={({ field }) => (
//               <FormItem>
//                 <FormControl>
//                   <Input placeholder="Send a message" type="text" {...field} />
//                 </FormControl>
//               </FormItem>
//             )}
//           />

//           <SendOfferModal
//             showModal={isOfferModal}
//             setShowModal={() => setIsOfferModal(false)}
//             setValue={form.setValue}
//             control={form.control}
//             parentFormId="create-message-form"
//           />

//           {/*
//           <FormField
//             control={form.control}
//             name="file"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel htmlFor="profile-picture-input">
//                   <ImageIcon />
//                 </FormLabel>
//                 <FormControl>
//                   <Input
//                     className="hidden"
//                     id="profile-picture-input" // Added an ID for direct access
//                     type="file"
//                     accept="image/*" // Accept only image files
//                     onChange={handleFileChange}
//                   />
//                 </FormControl>
//                 {imagePreview && (
//                   <div className="mt-4 relative w-[100px] h-[100px]">
//                     <p className="text-sm text-gray-500 mb-2">Image Preview:</p>
//                     <Image
//                       src={imagePreview}
//                       alt="Profile Preview"
//                       layout="fill" // Use fill for better image handling within a container
//                       objectFit="cover"
//                       className="rounded-md"
//                     />
//                     <Button
//                       type="submit"
//                       onClick={handleClearImage}
//                       className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 rounded-full p-1 h-auto w-auto"
//                       size="icon"
//                     >
//                       <XCircle className="h-4 w-4 text-white" />
//                     </Button>
//                   </div>
//                 )}
//               </FormItem>
//             )}
//           /> */}

//           {!currentUserIsBuyer && (
//             <Button type="button" onClick={() => setIsOfferModal(true)}>
//               send offer
//             </Button>
//           )}

//           <Button type="submit">Submit</Button>
//         </form>

//         {/* <DevTool control={form.control} /> */}
//       </Form>
//     </div>
//   );

//   function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
//     const file = event.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const base64String = reader.result as string;
//         setImagePreview(base64String);
//         form.setValue("file", base64String); // Set the base64 string to the form field
//       };
//       reader.readAsDataURL(file);
//     } else {
//       setImagePreview(null);
//       form.setValue("file", "");
//     }
//   }

//   function handleClearImage() {
//     setImagePreview(null);
//     form.setValue("file", "");

//     // ** IMPORTANT: Clear the file input's value directly
//     const fileInput = document.getElementById(
//       "profile-picture-input"
//     ) as HTMLInputElement;
//     if (fileInput) {
//       fileInput.value = ""; // This clears the visually displayed file name
//     }
//   }

//   function onSubmit(data: CreateMessageForm) {
//     createMessage(data);

//     // console.log("data is ", data);

//     form.reset();

//     // if (dummy.current) {
//     //   dummy.current.scrollIntoView({ behavior: "smooth" });
//     // }
//   }
// };

// export default page;

// =================== our new design

"use client";
import { useCreateMessage, useGetConversationsById } from "@/api/chats";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createMessageDefaultForm } from "@/forms";
import { createMessageForm, CreateMessageForm } from "@/schemas";
import { useAuthStore } from "@/store/use-auth.store";
import { useChatStore } from "@/store/use-chat.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon, XCircle, Send } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useBrowser } from "@/hooks/use-browser.hook";
import { useSellerByName } from "@/api/sellers";
import { useBuyerByName } from "@/api/buyers";
import SendOfferModal from "@/components/send-offer-modal";
import { cn } from "@/lib/utils"; // Assuming you have a utility for class names

const Page = () => {
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

  useBuyerByName({
    isBuyer: currentUserIsBuyer,
    username: otherUser,
    authUser,
  });
  useSellerByName({
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
      const defaultForm = createMessageDefaultForm(
        authUser,
        conversation,
        otherSeller,
        otherBuyer
      );
      form.reset(defaultForm);
    }
  }, [authUser, conversation, otherSeller, otherBuyer, form]);

  useEffect(() => {
    if (dummy.current) {
      dummy.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (!isbrowser) return null;

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
        form.setValue("file", base64String);
      };
      reader.readAsDataURL(file);
    } else {
      handleClearImage();
    }
  }

  function handleClearImage() {
    setImagePreview(null);
    form.setValue("file", "");
    const fileInput = document.getElementById("file-input") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  }

  function onSubmit(data: CreateMessageForm) {
    createMessage(data);
    form.reset();
    // form.reset({ ...data, body: "", file: "", hasOffer: false, offer: null });
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      {/* --- Chat Header --- */}
      <header className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm flex items-center justify-between">
        <h2 className="text-xl font-semibold">{otherUser || "Chat"}</h2>
        {/* You can add user profile picture, online status, etc. here */}
      </header>

      {/* --- Chat Messages --- */}
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => {
          const isSender = msg.senderUsername === authUser?.username;
          return (
            <div
              key={msg.id || index}
              className={cn(
                "flex items-start",
                isSender ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "p-3 rounded-xl max-w-[70%]",
                  isSender
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-bl-none"
                )}
              >
                {msg.body && <p className="text-sm break-words">{msg.body}</p>}
                {msg.hasOffer && msg.offer && (
                  <div className="mt-2 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                      Custom Offer
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {msg.offer.gigTitle}
                    </p>
                    <p className="mt-1 text-sm font-medium">
                      Price: ${msg.offer.price}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Delivery: {msg.offer.deliveryInDays} days
                    </p>
                    <p className="mt-2 text-sm italic text-gray-600 dark:text-gray-300 break-words">
                      "{msg.offer.description}"
                    </p>
                    <div className="mt-3 flex gap-2">
                      {currentUserIsBuyer ? (
                        <>
                          <Button
                            className="bg-green-600 hover:bg-green-700 text-white"
                            size="sm"
                            onClick={() => router.push(`/checkout/${msg.id}`)}
                          >
                            Accept
                          </Button>
                          <Button
                            className="bg-red-500 hover:bg-red-600 text-white"
                            size="sm"
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <Button
                          className="bg-red-500 hover:bg-red-600 text-white"
                          size="sm"
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  </div>
                )}
                {msg.file && (
                  <div className="mt-2 w-40 h-40 relative rounded-lg overflow-hidden">
                    <Image
                      src={msg.file}
                      alt="Attached file"
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
        <span ref={dummy}></span>
      </main>

      {/* --- Message Input Form --- */}
      <Form {...form}>
        <form
          id="create-message-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center gap-2"
        >
          {/* File Input and Preview */}
          <div className="relative">
            {imagePreview && (
              <div className="absolute bottom-12 left-0 w-24 h-24 rounded-lg overflow-hidden shadow-md">
                <Image
                  src={imagePreview}
                  alt="Image preview"
                  fill
                  style={{ objectFit: "cover" }}
                />
                <button
                  type="button"
                  onClick={handleClearImage}
                  className="absolute top-1 right-1 p-0.5 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
                >
                  <XCircle size={16} />
                </button>
              </div>
            )}
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <label htmlFor="file-input" className="cursor-pointer">
                      <ImageIcon className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" />
                      <Input
                        id="file-input"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Main message input */}
          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    placeholder="Send a message..."
                    {...field}
                    className="flex-1 rounded-full bg-gray-100 dark:bg-gray-700 border-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Buttons */}
          {!currentUserIsBuyer && (
            <Button
              type="button"
              onClick={() => setIsOfferModal(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              Send Offer
            </Button>
          )}

          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 h-auto w-auto"
            size="icon"
          >
            <Send size={20} />
          </Button>

          <SendOfferModal
            showModal={isOfferModal}
            setShowModal={() => setIsOfferModal(false)}
            setValue={form.setValue}
            control={form.control}
            parentFormId="create-message-form"
          />
        </form>
      </Form>
    </div>
  );
};

export default Page;
