import { LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  isBtn?: boolean;
  Icon: LucideIcon;
  title: string;
  // onClick?: () => void;
  onClick?: () => void;

  link?: string;
}

const DropdownMenu = (props: Props) => {
  const { isBtn, Icon, title, link, onClick } = props;

  const router = useRouter();

  return (
    <div
      onClick={() => {
        console.log("helo");
        if (link) router.push(link);
        if (onClick) onClick();
      }}
      className={`flex flex-row gap-x-[10px] cursor-pointer ${
        isBtn && "px-[8px] py-[4px] bg-[#CDC0A8] rounded-[4px]"
      }`}
    >
      <Icon strokeWidth={1} className="w-[20px] h-[20px]" />
      <span className="font-roboto font-normal text-[14px] text-[#0E0F19]">
        {title}
      </span>
    </div>
  );
};

export default DropdownMenu;
