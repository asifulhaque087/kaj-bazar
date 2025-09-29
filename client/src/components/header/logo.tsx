import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return (
    <h1
      className="font-rodium-libre tracking-[2.4] text-[24px] text-[#F7F7FA] cursor-pointer"
      onClick={() => router.push("/")}
    >
      KajBazar
    </h1>
  );
};

export default Logo;
