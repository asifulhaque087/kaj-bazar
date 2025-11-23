import { cn } from "@/lib/utils";

interface Props {
  reverse?: boolean;
  body: string | undefined;
}

const TextMessage = (props: Props) => {
  const { reverse, body } = props;
  return (
    <p
      className={cn(
        "font-roboto font-normal text-sm text-[#0E0F19]  p-[12px] rounded-[8px]",
        reverse
          ? "rounded-br-[0]  bg-[#CDC0A8]"
          : "  rounded-bl-[0] bg-[#CFCFD1]"
      )}
    >
      {/* hello, panze! can you help me building this. do you want it ? */}
      {body}
    </p>
  );
};

export default TextMessage;
