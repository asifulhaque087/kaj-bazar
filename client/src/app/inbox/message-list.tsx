import TextMessage from "@/app/inbox/text-message";

interface Props {
  className: string;
}
const MessageList = (props: Props) => {
  const { className } = props;
  return (
    <div
      className={`${className} bg-[#FEFEFF] rounded-[8px] border border-[#E7E7E8] h-[80vh] overflow-hidden`}
    >
      <h3 className="capitalize font-roboto font-medium text-[20px] border-b border-[#E7E7E8]  px-[24px] py-[16px]">
        Jane austen
      </h3>

      <div className="flex flex-col gap-y-[20px]">
        {[...Array(6)].map((item, index) => (
          <TextMessage key={index} reverse={index % 2 === 0 ? true : false} />
        ))}
      </div>
    </div>
  );
};

export default MessageList;
