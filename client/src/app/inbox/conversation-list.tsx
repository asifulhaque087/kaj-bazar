import Conversation from "@/app/inbox/conversation";
import { Conversation as ConversationType } from "@/schemas";

interface Props {
  className?: string;
  conversations: ConversationType[] | undefined;
}
const ConversationList = (props: Props) => {
  const { className, conversations } = props;
  return (
    <div
      className={`${className} bg-[#FEFEFF] rounded-[8px] border border-[#E7E7E8] h-[80vh] overflow-hidden`}
    >
      <h3 className="capitalize font-roboto font-medium text-[20px] border-b border-[#E7E7E8]  px-[24px] py-[16px]">
        All conversations
      </h3>

      <div className="flex flex-col gap-y-[20px]">
        {conversations?.map((item, index) => (
          <Conversation conversation={item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default ConversationList;
