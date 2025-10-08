import { useRouter } from "next/navigation";

interface Props {
  className?: string;
}

const Logo = (props: Props) => {
  const { className } = props;
  const router = useRouter();

  return (
    <h1
      className={`font-rodium-libre tracking-[2.4] text-[24px] text-[#F7F7FA] cursor-pointer flex items-center ${className}`}
      onClick={() => router.push("/")}
    >
      KajBazar
    </h1>
  );
};

export default Logo;
