import OfferMessage from "@/app/inbox/offer-message";
import TextMessage from "@/app/inbox/text-message";
import { Message } from "@/schemas";
import { useAuthStore } from "@/store/use-auth.store";
import { formatDistanceToNowStrict, parseISO } from "date-fns";

interface Props {
  reverse?: boolean;
  // body: string | undefined;
  msg: Message;
}

const MessageBox = (props: Props) => {
  const { reverse, msg } = props;
  const { authUser } = useAuthStore();

  return (
    <div
      className={`flex ${
        reverse && "flex-row-reverse"
      } items-end gap-x-[12px] py-[20px] px-[24px]`}
    >
      {/* profile*/}
      <div className="w-[48px] h-[48px] rounded-full overflow-hidden">
        <img
          className="w-full h-full object-cover object-center"
          // src={reverse ? msg.senderPicture : msg.receiverPicture}
          // src={msg.receiverPicture}
          src={msg.senderPicture}
          alt=""
        />
      </div>
      {/* message body */}
      <div className="flex flex-col gap-y-1 w-full max-w-[300px]">
        {msg.body && <TextMessage body={msg.body} reverse={reverse} />}
        {msg.hasOffer && msg.offer && (
          <OfferMessage
            offer={msg.offer}
            reverse={reverse}
            messageId={msg.id}
          />
        )}

        {/* Time */}
        <span
          className={`font-roboto font-normal text-xs text-[#3E3F47] ${
            reverse && "text-end"
          }`}
        >
          {/* 8 mins ago */}
          {msg?.createdAt &&
            formatDistanceToNowStrict(parseISO(msg.createdAt), {
              addSuffix: true,
            })}
        </span>
      </div>
    </div>
  );
};

export default MessageBox;
