import MessageBox from "@/features/chat/components/message-box";
import SendMessageForm from "@/features/chat/components/send-message-form";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/use-auth.store";
import { useChatStore } from "@/store/use-chat.store";
import { MessageSquareMore } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";

interface Props {
  className: string;
  // conversation?: Conversation | undefined;
}
const MessageList = (props: Props) => {
  // const { className, conversation } = props;
  const { className } = props;

  // ** store
  // const  setMessages  = useChatStore((state)=>state.setMessages);

  const { authUser } = useAuthStore();
  const { messages, messageReceiverUser, setMessages, selectedConversation } =
    useChatStore();

  // const { setMessages, messages, messageReceiverUser } = useChatStore(
  //   (state) => ({
  //     setMessages: state.setMessages,
  //     messages: state.messages,
  //     messageReceiverUser: state.messageReceiverUser,
  //   })
  // );

  // ** --- Reference ---
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scroll({
        top: messagesEndRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  // useEffect(() => {
  //   return () => setMessages([]);
  // }, [setMessages]);

  useEffect(() => {
    return () => setMessages([]);
  }, []);

  // const isConversationSelected = !!messages.length;
  const isConversationSelected = !!selectedConversation && messages.length;

  console.log("message ############## ", messages);

  return (
    <div
      // className={`${className} bg-[#FEFEFF] rounded-[8px] border border-[#E7E7E8] h-[75vh] xl:h-[80vh] overflow-hidden flex flex-col`}

      className={cn(
        "bg-[#FEFEFF] rounded-[8px] border border-[#E7E7E8] h-[75vh] xl:h-[80vh] overflow-hidden flex flex-col",
        !isConversationSelected && "items-center justify-center h-full",

        className
      )}
    >
      {isConversationSelected && (
        <h3 className="capitalize font-roboto font-medium text-[20px] border-b border-[#E7E7E8]  px-[24px] py-[16px]">
          {messageReceiverUser?.name}
        </h3>
      )}

      {!isConversationSelected && (
        <div className="bg-[#F7F7FA] rounded-[8px] w-full max-w-[345px] flex items-center justify-center flex-col gap-y-[20px] px-[24px] py-[48px]">
          <div className="bg-[#616BA4] rounded-[4px] px-[22px] py-[18px]">
            <MessageSquareMore className="text-[#F7F7FA] w-[32px] h-[32px]" />
          </div>

          <h1 className="font-roboto font-normal text-[24px] text-[#0E0F19] text-center">
            Welcome To KajBazar
          </h1>

          <p className="font-roboto font-normal text-[14px] text-[#3E3F47] text-center">
            Select a conversation from the sidebar to start Chatting
          </p>
        </div>
      )}

      {isConversationSelected && (
        <div
          className="flex flex-col gap-y-[20px] grow overflow-y-auto"
          ref={messagesEndRef}
        >
          {messages.map((msg) => (
            // <TextMessage key={msg.id} reverse={index % 2 === 0 ? true : false} />
            <MessageBox
              key={msg.id}
              msg={msg}
              reverse={msg.senderUsername === authUser?.username ? true : false}
            />
            // <TextMessage
            //   key={msg.id}
            //   msg={msg}
            //   reverse={msg.senderUsername === authUser?.username ? true : false}
            // />
          ))}
        </div>
      )}

      {isConversationSelected && (
        <div className="h-[80px] shrink-0  grid place-items-center border-t border-[#E7E7E8]">
          <SendMessageForm />
        </div>
      )}
    </div>
  );
};

export default MessageList;

// =============================

// import SendMessageForm from "@/app/inbox/send-message-form";
// import TextMessage from "@/app/inbox/text-message";
// import { Conversation } from "@/schemas";
// import { useAuthStore } from "@/store/use-auth.store";
// import { useChatStore } from "@/store/use-chat.store";
// import { useEffect, useRef } from "react";

// interface Props {
//   className: string;
// }

// const MessageList = (props: Props) => {
//   const { className } = props;

//   // Ref for the scrollable container
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const { authUser } = useAuthStore();
//   const { messages, messageReceiverUser } = useChatStore();

//   useEffect(() => {
//     // Scroll to the bottom of the message container smoothly
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scroll({
//         top: messagesEndRef.current.scrollHeight,
//         behavior: "smooth", // <-- This is what makes it smooth
//       });
//     }
//   }, [messages]);

//   return (
//     <div
//       className={`${className} bg-[#FEFEFF] rounded-[8px] border border-[#E7E7E8] h-[75vh] xl:h-[80vh] overflow-hidden flex flex-col`}
//     >
//       <h3 className="capitalize font-roboto font-medium text-[20px] border-b border-[#E7E7E8]  px-[24px] py-[16px]">
//         {messageReceiverUser?.name}
//       </h3>

//       {/* Apply the ref to the scrollable container */}
//       <div
//         ref={messagesEndRef}
//         className="flex flex-col gap-y-[20px] grow overflow-y-auto"
//       >
//         {messages.map((msg) => (
//           <TextMessage
//             key={msg.id}
//             msg={msg}
//             reverse={msg.senderUsername === authUser?.username ? true : false}
//           />
//         ))}
//       </div>

//       <div className="h-[80px]  grid place-items-center border-t border-[#E7E7E8]">
//         <SendMessageForm />
//       </div>
//     </div>
//   );
// };

// export default MessageList;
