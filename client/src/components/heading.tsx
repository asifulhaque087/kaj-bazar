import { cn } from "@/lib/utils";

interface Props {
  maxWidth?: string;
  title: string;
  subTitle?: string;
  isLine?: boolean;
  align?: "center" | "left" | "right";
}

const Heading = (props: Props) => {
  const { title, isLine, subTitle, align = "center", maxWidth } = props;
  return (
    <div
      className={cn(
        "flex flex-col gap-y-2.5",
        align === "center" && "text-center",
        align === "left" && "text-left",
        align === "right" && "text-right",
        maxWidth
      )}
    >
      {subTitle && (
        <span className="font-roboto font-normal text-xs text-[#3E3F47]">
          {subTitle}
        </span>
      )}

      <h1 className="font-roboto text-[32px] font-medium  text-[#0E0F19] capitalize">
        {title}
      </h1>
      {isLine && <div className="bg-[#0E0F19] h-0.5 rounded-full" />}
    </div>
  );
};

export default Heading;
