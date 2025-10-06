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
        onClick ? onClick() : router.push("/become-a-seller");
      }}
      className={`rounded-[8px] bg-[#CDC0A8] px-[20px] py-[8px] font-roboto font-medium text-sm text-[#3E3F47] whitespace-nowrap capitalize  ${className} cursor-pointer`}
    >
      Become a seller
    </button>
  );
};

export default BecomeASeller;
