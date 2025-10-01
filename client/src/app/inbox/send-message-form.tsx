import { LinkIcon, Send } from "lucide-react";

const SendMessageForm = () => {
  return (
    <form
      className="flex gap-x-[8px] px-[24px] h-[40px] w-full"
      onSubmit={sendMessage}
    >
      <input
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
};

export default SendMessageForm;
