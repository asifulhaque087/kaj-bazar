import { useCreateMessage } from "@/api/chats";
import { createMessageDefaultForm } from "@/forms";
import { createMessageForm, CreateMessageForm } from "@/schemas";
import { useChatStore } from "@/store/use-chat.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { LinkIcon, Send } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const SendMessageForm = () => {
  // ** --- Mutation ---
  const { mutate: createMessage } = useCreateMessage();

  // ** --- Store ---
  const { selectedConversation, messageSenderUser, messageReceiverUser } =
    useChatStore();

  // ** --- Use form ---
  const form = useForm<CreateMessageForm>({
    resolver: zodResolver(createMessageForm),
    defaultValues: createMessageDefaultForm(null, null, null),
    mode: "onSubmit",
  });

  useEffect(() => {
    if (messageSenderUser && messageReceiverUser && selectedConversation) {
      const defaultForm = createMessageDefaultForm(
        messageSenderUser,
        messageReceiverUser,
        selectedConversation
      );
      form.reset(defaultForm);
    }
  }, [messageSenderUser, messageReceiverUser, selectedConversation]);

  // console.log("errors are ##### ", form.formState.errors)

  return (
    <form
      className="flex gap-x-[8px] px-[24px] h-[40px] w-full"
      // onSubmit={sendMessage}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <input
        {...form.register("body")}
        type="text"
        className="bg-[#FEFEFF] rounded-[8px] outline-none p-[12px] border border-[#E7E7E8] font-roboto text-[#3E3F47] text-sm  placeholder:font-roboto placeholder:text-[#6E6F75] placeholder:text-sm grow"
        placeholder="Type message ..."
      />

      <button className="border-none outline-none h-full rounded-[8px] bg-[#616BA4] text-[#F7F7FA] capitalize px-[12px] py-[8px] font-roboto text-xs font-normal">
        <LinkIcon className="w-[12px] h-[12px]" />
      </button>

      <button className="border-none outline-none h-full rounded-[8px] bg-[#616BA4] text-[#F7F7FA] capitalize px-[12px] py-[8px] font-roboto text-xs font-normal">
        offer
      </button>

      <button className="border-none outline-none h-full rounded-[8px] bg-[#616BA4] text-[#F7F7FA] capitalize px-[12px] py-[8px] font-roboto text-xs font-normal">
        <Send className="w-[12px] h-[12px]" />
      </button>
    </form>
  );

  function sendMessage(e: any) {
    e.preventDefault();
    console.log("send message data is ");
  }

  function onSubmit(data: CreateMessageForm) {
    // console.log("send message data is ");
    createMessage(data);
    form.reset();
    // form.reset({ ...data, body: "", file: "", hasOffer: false, offer: null });
  }
};

export default SendMessageForm;
