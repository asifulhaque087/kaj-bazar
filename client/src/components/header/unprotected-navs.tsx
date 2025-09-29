import LoginModal from "@/components/login-modal";
import RegisterModal from "@/components/register-modal";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  className?: string;
}

const navs = [
  { title: "sign in", path: "" },
  { title: "sign up", path: "" },
  { title: "gigs", path: "/gigs" },
];

const UnprotectedNavs = (props: Props) => {
  const { className } = props;

  const [activeItem, setActiveItem] = useState(-1);

  const router = useRouter();

  return (
    <>
      <div
        className={`flex items-center justify-center gap-x-[24px] ${className}`}
      >
        {navs.map((nav, i) => (
          <p
            key={i}
            className="font-roboto text-[16px] text-[#F7F7FA] whitespace-nowrap capitalize cursor-pointer"
            onClick={() =>
              nav.path ? router.push(nav.path) : setActiveItem(i)
            }
          >
            {nav.title}
          </p>
        ))}

        {/* <p className="font-roboto text-[16px] text-[#F7F7FA] whitespace-nowrap capitalize">
        sign in
      </p> */}
      </div>

      <LoginModal
        showModal={activeItem == 0 ? true : false}
        setShowModal={setActiveItem}
      />

      <RegisterModal
        showModal={activeItem == 1 ? true : false}
        setShowModal={setActiveItem}
      />
    </>
  );
};

export default UnprotectedNavs;
