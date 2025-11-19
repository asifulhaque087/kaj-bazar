import PrivateNavs from "@/components/widgets/header/private-navs";
import PublicNavs from "@/components/widgets/header/public-navs";
import { useAuthStore } from "@/store/use-auth.store";
import Link from "next/link";

interface Props {
  className?: string;
}

const Navs = (props: Props) => {
  // ** --- Props ---
  const { className } = props;

  // ** --- Stores ---
  const { authUser } = useAuthStore();

  return (
    <>
      <div
        className={`flex items-center justify-center gap-x-[24px] ${className}`}
      >
        {/* public navs */}
        {!authUser && <PublicNavs />}

        {/* common navs */}
        <Link
          href={"/gigs"}
          className="font-roboto text-[14px] text-[#F7F7FA] whitespace-nowrap capitalize cursor-pointer"
        >
          gigs
        </Link>

        {/* private navs */}
        {!!authUser && <PrivateNavs />}
      </div>
    </>
  );
};

export default Navs;
