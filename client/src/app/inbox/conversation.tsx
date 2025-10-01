import { Conversation as ConversationType } from "@/schemas";

interface Props {
  conversation: ConversationType;
}

const Conversation = (props: Props) => {
  const { conversation } = props;
  return (
    <div className="flex items-center gap-x-[12px] border-b border-[#E7E7E8] py-[20px] px-[24px]">
      <div className="w-[48px] h-[48px] rounded-full bg-blue-400"></div>
      <div className="flex flex-col gap-y-1">
        <div className="flex items-center gap-x-4">
          <h6 className="font-roboto font-normal text-[16px] text-[#0E0F19]">
            jane austen
          </h6>
          <span className="font-roboto font-normal text-xs text-[#3E3F47]">
            8 mins ago
          </span>
        </div>
        <p className="font-roboto font-normal text-sm text-[#6E6F75]">
          hello panze! can you help me building thi...
        </p>
      </div>
    </div>
  );
};

export default Conversation;
