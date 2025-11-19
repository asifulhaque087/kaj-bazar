import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface Props {
  className?: string;
  onClick?: () => void;
}

const BecomeASeller = (props: Props) => {
  const { className, onClick } = props;
  const router = useRouter();
  return (
    <button
      onClick={() => {
        if (onClick) return onClick();
        return router.push("/become-a-seller");
      }}
      className={cn(
        "rounded-[8px] bg-[#CDC0A8] px-[20px] py-[8px] font-roboto font-medium text-sm text-[#3E3F47] whitespace-nowrap capitalize  cursor-pointer hidden md:block ",
        className
      )}
    >
      Become a seller
    </button>
  );
};

export default BecomeASeller;
