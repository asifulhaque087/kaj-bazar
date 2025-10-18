import { createMessageDefaultForm } from "@/features/chats/default-form-values/chat.form";
import { useCreateMessage } from "@/features/chats/mutations/use-create-message.mutation";
import { createMessageForm, CreateMessageForm } from "@/features/chats/schemas/create-message.schema";
import SendOfferModal from "@/features/orders/components/send-offer-modal";
import { useChatStore } from "@/store/use-chat.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { LinkIcon, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const SendMessageForm = () => {
  // ** --- States ---

  const [isOfferModal, setIsOfferModal] = useState<boolean>(false);

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

  console.log("errors are ##### ", form.formState.errors);

  return (
    <>
      <form
        className="flex gap-x-[8px] px-[24px] h-[40px] w-full"
        id="create-message-form"
        // onSubmit={sendMessage}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <input
          {...form.register("body")}
          type="text"
          className="bg-[#FEFEFF] rounded-[8px] outline-none p-[12px] border border-[#E7E7E8] font-roboto text-[#3E3F47] text-sm  placeholder:font-roboto placeholder:text-[#6E6F75] placeholder:text-sm grow"
          placeholder="Type message ..."
        />

        <button
          type="button"
          className="border-none outline-none h-full rounded-[8px] bg-[#616BA4] text-[#F7F7FA] capitalize px-[12px] py-[8px] font-roboto text-xs font-normal cursor-pointer"
        >
          <LinkIcon className="w-[12px] h-[12px]" />
        </button>

        <button
          type="button"
          className="border-none outline-none h-full rounded-[8px] bg-[#616BA4] text-[#F7F7FA] capitalize px-[12px] py-[8px] font-roboto text-xs font-normal cursor-pointer"
          onClick={() => setIsOfferModal(true)}
        >
          offer
        </button>

        <button
          type="submit"
          className="border-none outline-none h-full rounded-[8px] bg-[#616BA4] text-[#F7F7FA] capitalize px-[12px] py-[8px] font-roboto text-xs font-normal cursor-pointer"
        >
          <Send className="w-[12px] h-[12px]" />
        </button>
      </form>
      <SendOfferModal
        showModal={isOfferModal}
        setShowModal={setIsOfferModal}
        setValue={form.setValue}
        control={form.control}
        handleSubmit={form.handleSubmit}
        onSubmit={onSubmit}
      />
    </>
  );

  // function onSubmit(data: CreateMessageForm) {
  //   if (!data.body) return;
  //   createMessage(data);
  //   form.reset();
  // }

  function onSubmit(data: CreateMessageForm) {
    if (!data.body && !data.hasOffer) return;

    createMessage(data);

    // ✅ Close modal if it was an offer
    if (data.hasOffer) setIsOfferModal(false);

    form.reset();
  }
};

export default SendMessageForm;
