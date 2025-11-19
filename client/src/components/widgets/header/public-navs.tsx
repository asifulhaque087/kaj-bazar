"use client";

import BecomeASeller from "@/components/widgets/header/button";
import LoginModal from "@/features/auth/components/login-modal";
import RegisterModal from "@/features/auth/components/register-modal";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";

const navs = [
  { title: "Login", path: "" },
  { title: "Register", path: "" },
  // { title: "gigs", path: "/gigs" },
];

const PublicNavs = () => {
  // ** --- States ---
  const [activeItem, setActiveItem] = useState(-1);

  const router = useRouter();

  return (
    <>
      {navs.map((nav, i) => (
        <Fragment key={i}>
          <p
            key={i}
            className="font-roboto text-[14px] text-[#F7F7FA] whitespace-nowrap capitalize cursor-pointer"
            onClick={() =>
              nav.path ? router.push(nav.path) : setActiveItem(i)
            }
          >
            {nav.title}
          </p>

          {i === 0 && (
            <BecomeASeller
              className="order-0 md:order-1"
              onClick={() => setActiveItem(1)}
            />
          )}
        </Fragment>
      ))}

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

export default PublicNavs;
