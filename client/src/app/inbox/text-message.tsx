import { Message } from "@/schemas";
import { formatDistanceToNowStrict, parseISO } from "date-fns";

interface Props {
  reverse?: boolean;
  // body: string | undefined;
  msg: Message;
}

const TextMessage = (props: Props) => {
  const { reverse, msg } = props;
  return (
    <div
      className={`flex ${
        reverse && "flex-row-reverse"
      } items-center gap-x-[12px] py-[20px] px-[24px]`}
    >
      <div className="w-[48px] h-[48px] rounded-full overflow-hidden">
        <img
          className="w-full h-full object-cover object-center"
          // src={reverse ? msg.senderPicture : msg.receiverPicture}
          // src={msg.receiverPicture}
          src={msg.senderPicture}
          alt=""
        />
      </div>
      <div className="flex flex-col gap-y-1">
        <p
          className={`font-roboto font-normal text-sm text-[#0E0F19]  p-[12px] rounded-[8px]  ${
            reverse
              ? "rounded-br-[0]  bg-[#CDC0A8]"
              : "  rounded-bl-[0] bg-[#CFCFD1]"
          }`}
        >
          {/* hello, panze! can you help me building this. do you want it ? */}
          {msg?.body}
        </p>
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

  return (
    <div className="flex items-center gap-x-[12px] border-b border-[#E7E7E8] py-[20px] px-[24px]">
      <div className="w-[48px] h-[48px] rounded-full bg-blue-400"></div>
      <div className="flex flex-col gap-y-1">
        <p className="font-roboto font-normal text-sm text-[#0E0F19] bg-[#CFCFD1] p-[12px] rounded-[8px] rounded-bl-[0]">
          hello, panze! can you help me building this. do you want it ?
        </p>
        <span className="font-roboto font-normal text-xs text-[#3E3F47]">
          8 mins ago
        </span>
      </div>
    </div>
  );
};

export default TextMessage;
