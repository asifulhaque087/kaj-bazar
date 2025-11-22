"use client";

import BecomeASeller from "@/components/widgets/header/button";
import LoginModal from "@/features/auth/components/login-modal";
import RegisterModal from "@/features/auth/components/register-modal";
import { useAuthStore } from "@/store/use-auth.store";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";

const navs = [
  { title: "Login", path: "" },
  { title: "Register", path: "" },
  // { title: "gigs", path: "/gigs" },
];

const PublicNavs = () => {
  // ** --- States ---
  // const [activeItem, setActiveItem] = useState(-1);
  // ** --- store ---
  const { activeModalItem, setActiveModalItem } = useAuthStore();

  const router = useRouter();

  return (
    <>
      {navs.map((nav, i) => (
        <Fragment key={i}>
          <p
            key={i}
            className="font-roboto text-[14px] text-[#F7F7FA] whitespace-nowrap capitalize cursor-pointer"
            onClick={() =>
              // nav.path ? router.push(nav.path) : setActiveItem(i)
              nav.path ? router.push(nav.path) : setActiveModalItem(i)
            }
          >
            {nav.title}
          </p>

          {i === 0 && (
            <BecomeASeller
              className="order-0 md:order-1"
              // onClick={() => setActiveItem(1)}
              onClick={() => setActiveModalItem(1)}
            />
          )}
        </Fragment>
      ))}

      <LoginModal
        showModal={activeModalItem == 0 ? true : false}
        setShowModal={setActiveModalItem}
      />

      <RegisterModal
        showModal={activeModalItem == 1 ? true : false}
        setShowModal={setActiveModalItem}
      />
    </>
  );
};

export default PublicNavs;
