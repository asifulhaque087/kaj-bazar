import { Conversation as ConversationType } from "@/schemas";

import { formatDistanceToNowStrict, parseISO } from "date-fns";

interface Props {
  conversation: ConversationType;
}

const Conversation = (props: Props) => {
  const { conversation } = props;
  return (
    <div className="flex items-center gap-x-[12px] border-b border-[#E7E7E8] py-[20px] px-[24px]">
      <div className="w-[48px] h-[48px] rounded-full overflow-hidden">
        <img
          className="w-full h-full object-cover object-center"
          src={conversation?.messages[0]?.senderPicture}
          alt=""
        />
      </div>
      <div className="flex flex-col gap-y-1">
        <div className="flex items-center gap-x-4">
          <h6 className="font-roboto font-normal text-[16px] text-[#0E0F19]">
            {conversation?.senderUsername}
          </h6>
          <span className="font-roboto font-normal text-xs text-[#3E3F47]">
            {conversation?.messages[0]?.createdAt &&
              formatDistanceToNowStrict(
                parseISO(conversation.messages[0].createdAt),
                { addSuffix: true }
              )}
          </span>
        </div>
        <p className="font-roboto font-normal text-sm text-[#6E6F75]">
          {/* hello panze! can you help me building thi... */}
          {conversation?.messages[0]?.body}
        </p>
      </div>
    </div>
  );
};

export default Conversation;
