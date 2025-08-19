"use client";

// ** Third Party Imports
import { useState } from "react";

// ** Components Imports
import LoginModal from "@/components/login-modal";
import RegisterModal from "@/components/register-modal";
import { MoveUpRight } from "lucide-react";
import { useRouter } from "next/navigation";

const Navigation = () => {
  const [activeItem, setActiveItem] = useState(-1);
  const router = useRouter();

  const menus = [
    // {
    //   title: "Become a seller",
    // },
    { title: "Sign in" },
    { title: "Sign up" },
    { title: "Home" },
    { title: "Properties" },
  ];

  return (
    <>
      <div className="flex items-center justify-between">
        {/* --- col 1 logo --- */}
        <div
          className="hidden md:flex items-center gap-x-[6px] cursor-pointer"
          onClick={() => router.push("/")}
        >
          <div className="flex gap-x-[2px] items-end">
            <span className="w-[7px] h-[15px] bg-[#27C9BE] rounded-[2px]" />
            <span className="w-[7px] h-[22px]  bg-[#6392D8] rounded-[2px]" />
            <span className="w-[7px] h-[22px] bg-[#27C9BE] rounded-[2px]" />
          </div>
          <span className="font-[Roboto] font-[700] text-[15px]">kajBazar</span>
        </div>

        {/* --- col 2  --- */}
        <div className="flex grow md:grow-0 items-center border-[#F2F2F2] border-[1px] bg-[#F8F8F8] rounded-[34px] py-[8px] pl-[16px] pr-[8px] justify-between gap-x-[20px]] md:gap-x-[52px] text-[16px] tracking-[-0.96px] text-[#838383] font-[400] capitalize">
          {/* logo of nav */}

          <div
            className="md:hidden flex gap-x-[2px] items-end cursor-pointer"
            onClick={() => router.push("/")}
          >
            <span className="w-[7px] h-[15px] bg-[#27C9BE] rounded-[2px]" />
            <span className="w-[7px] h-[22px]  bg-[#6392D8] rounded-[2px]" />
            <span className="w-[7px] h-[22px] bg-[#27C9BE] rounded-[2px]" />
          </div>

          {/* <div className="flex items-center gap-x-[52px] overflow-auto scrollbar-hide"> */}
          {menus.map((menu, i) => (
            <div
              key={i}
              onClick={() => setActiveItem(i)}
              className={`${
                i === activeItem ? "text-[#000] font-[700] " : null
              } whitespace-nowrap cursor-pointer ${
                [2, 3].includes(i) ? "hidden md:block" : null
              }`}
            >
              {menu.title}
            </div>
          ))}
          <button className="bg-[#6392D8] text-[14px] text-white font-[500] font-[Roboto] px-[20px] py-[10px] rounded-[20px] flex items-center gap-x-[4px] cursor-pointer"
          
          onClick={() => router.push("/become-a-seller")}
          >
            <span>Become a seller</span>
            <span>
              <MoveUpRight size={18} />
            </span>
          </button>
          {/* </div> */}
        </div>

        <LoginModal
          showModal={activeItem == 0 ? true : false}
          setShowModal={setActiveItem}
          // setShowModal={() => setActiveItem(-1)}
        />

        <RegisterModal
          showModal={activeItem == 1 ? true : false}
          // setShowModal={() => setActiveItem(-1)}
          setShowModal={setActiveItem}
        />
      </div>
    </>
  );
};

export default Navigation;
