"use client";

// ** Third Party Imports
import { Fragment, useState } from "react";

// ** Components Imports
import LoginModal from "@/components/login-modal";
import RegisterModal from "@/components/register-modal";
import { ArrowRight, MoveUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/use-auth.store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { Buyer, Seller } from "@/schemas";

const Navigation = () => {
  const [activeItem, setActiveItem] = useState(-1);
  const router = useRouter();

  const { authUser, buyer, seller, role } = useAuthStore();

  const menus = [{ title: "Sign in" }, { title: "Sign up" }];

  return (
    <>
      <div className="flex items-center justify-between">
        {/* --- col 1 logo --- */}
        <div
          className="hidden md:flex items-center gap-x-[6px] cursor-pointer"
          onClick={() => router.push("/")}
          // onClick={() => router.replace("/")}
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

          {!authUser && (
            <Fragment>
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
              <button
                // onClick={() => setActiveItem(1)}
                className="bg-[#6392D8] text-[14px] text-white font-[500] font-[Roboto] px-[20px] py-[10px] rounded-[20px] hidden xl:flex items-center gap-x-[4px] cursor-pointer"
                onClick={() => {
                  if (authUser) return router.push("/become-a-seller");
                  setActiveItem(1);
                }}
              >
                <span>Become a seller</span>
                <span>
                  <MoveUpRight size={18} />
                </span>
              </button>
            </Fragment>
          )}

          {authUser && (
            <Fragment>
              <AuthButton role={role} buyer={buyer} seller={seller} />

              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    {/* <Button variant="outline">Open</Button> */}
                    <div className="relative w-[50px] h-[50px] rounded-full overflow-clip cursor-pointer">
                      <Image
                        className="absolute object-cover object-center left-0 top-0 right-0 bottom-0"
                        src={authUser.profilePicture}
                        fill
                        alt="profile"
                      />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </Fragment>
          )}
        </div>

        <LoginModal
          showModal={activeItem == 0 ? true : false}
          setShowModal={setActiveItem}
        />

        <RegisterModal
          showModal={activeItem == 1 ? true : false}
          setShowModal={setActiveItem}
        />

        {/* {activeItem === 0 && (
          <LoginModal
            showModal={activeItem == 0 ? true : false}
            setShowModal={setActiveItem}
          />
        )}

        {activeItem === 1 && (
          <RegisterModal
            showModal={activeItem == 1 ? true : false}
            setShowModal={setActiveItem}
          />
        )} */}
      </div>
    </>
  );
};

export default Navigation;

interface AuthButtonProps {
  role: "buyer" | "seller" | null;
  buyer: Buyer | null;
  seller: Seller | null;
}

const AuthButton = (props: AuthButtonProps) => {
  const { role, buyer, seller } = props;

  const router = useRouter();

  // console.log("rolw is ", role)
  // console.log("buyer is ", buyer)

  // if (!role || !buyer) return <span>...</span>;
  if (!role) return <span>...</span>;

  let buttonToRender;

  if (role === "buyer" && buyer?.isSeller) {
    buttonToRender = (
      <button
        className="bg-[#6392D8] text-[14px] text-white font-[500] font-[Roboto] px-[20px] py-[10px] rounded-[20px] flex items-center gap-x-[4px] cursor-pointer"
        onClick={() => router.push(`/seller/profile/${buyer.id}`)}
      >
        <span>switch to seller</span>
        <span>
          <ArrowRight size={18} />
        </span>
      </button>
    );
  } else if (role === "seller") {
    buttonToRender = (
      <button
        className="bg-[#6392D8] text-[14px] text-white font-[500] font-[Roboto] px-[20px] py-[10px] rounded-[20px] flex items-center gap-x-[4px] cursor-pointer"
        // onClick={() => router.push("/become-a-seller")}
        onClick={() => router.push(`/buyer/profile/${seller?.id}`)}
      >
        <span>switch to buyer</span>
        <span>
          <ArrowRight size={18} />
        </span>
      </button>
    );
  } else if (role === "buyer" && !buyer?.isSeller) {
    buttonToRender = (
      <button
        className="bg-[#6392D8] text-[14px] text-white font-[500] font-[Roboto] px-[20px] py-[10px] rounded-[20px] flex items-center gap-x-[4px] cursor-pointer"
        onClick={() => router.push("/become-a-seller")}
      >
        <span>Become a seller</span>
        <span>
          <ArrowRight size={18} />
        </span>
      </button>
    );
  }

  return (
    <div>
      {/* Other JSX content */}
      {buttonToRender}
    </div>
  );
};
