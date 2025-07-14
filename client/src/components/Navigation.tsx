"use client";

import AuthModal from "@/components/auth-modal";
import { BaseModal } from "@/components/base-modal";
import { useState } from "react";

const Navigation = () => {
  const [activeItem, setActiveItem] = useState(-1);

  const menus = [
    // {
    //   title: "Become a seller",
    // },
    { title: "Sign in" },

    { title: "Sign up" },
  ];

  return (
    <>
      <div className="flex items-center border-[#F2F2F2] border-[1px] bg-[#F8F8F8] rounded-[34px] px-[26px] py-[16px] gap-x-[52px] text-[16px] tracking-[-0.96px] text-[#838383] font-[400] capitalize">
        {/* logo */}

        <div className="flex gap-x-[2px] items-end">
          <span className="w-[7px] h-[15px] bg-[#27C9BE] rounded-[2px]" />
          <span className="w-[7px] h-[22px]  bg-[#6392D8] rounded-[2px]" />
          <span className="w-[7px] h-[22px] bg-[#27C9BE] rounded-[2px]" />
        </div>

        <div className="flex items-center gap-x-[52px] overflow-auto scrollbar-hide">
          {menus.map((menu, i) => (
            <div
              key={i}
              onClick={() => setActiveItem(i)}
              className={`${
                i === activeItem ? "text-[#000] font-[700] " : null
              } whitespace-nowrap cursor-pointer`}
            >
              {menu.title}
            </div>
          ))}
        </div>
      </div>

      <AuthModal />
    </>
  );
};


    <BaseModal
      // showModal={!!deletingCategory}
      // showModal={true}
      showModal={false}
      // setShowModal={() => setDeletingCategory(null)}
      className="max-w-md p-8"
    ></BaseModal>

export default Navigation;
