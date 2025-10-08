import BecomeASeller from "@/components/widgets/header/button";
import ProfileDropdown from "@/components/widgets/header/profile-dropdown";
import LoginModal from "@/features/auth/components/login-modal";
import RegisterModal from "@/features/auth/components/register-modal";
import { useAuthStore } from "@/store/use-auth.store";
import { useChatStore } from "@/store/use-chat.store";
import { Bell, MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";

interface Props {
  className?: string;
}

const navs = [
  { title: "Login", path: "" },
  { title: "Register", path: "" },
  // { title: "gigs", path: "/gigs" },
];

const protectedNavs = [
  { title: "Notifications", icon: Bell, path: "" },
  { title: "Messages", icon: MessageSquare, path: "" },
  //   { title: "Register", path: "" },
  // { title: "gigs", path: "/gigs" },
];

const Navs = (props: Props) => {
  // ** --- Props ---
  const { className } = props;

  // ** --- States ---
  const [activeItem, setActiveItem] = useState(-1);

  // ** --- Stores ---
  const { authUser, buyer } = useAuthStore();
  const { unreadMessages } = useChatStore();

  const router = useRouter();

  console.log("@############### ", unreadMessages);

  return (
    <>
      <div
        className={`flex items-center justify-center gap-x-[24px] ${className}`}
      >
        {!authUser &&
          navs.map((nav, i) => (
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

        {authUser &&
          protectedNavs.map((nav, i) => (
            <Fragment key={i}>
              <div
                key={i}
                className="font-roboto text-[14px] text-[#F7F7FA] whitespace-nowrap capitalize cursor-pointer"
                onClick={() =>
                  nav.path ? router.push(nav.path) : setActiveItem(i)
                }
              >
                {/* {nav.title} */}
                <div className="relative">
                  <nav.icon
                    strokeWidth={1}
                    className="w-[20px] h-[20px] text-[#FEFEFF]"
                  />
                  <span className="absolute top-0 right-0 w-[8px] h-[8px] rounded-full bg-red-500" />
                </div>
              </div>

              {i === 1 && !buyer?.isSeller && <BecomeASeller />}
              {i === 1 && <ProfileDropdown />}
            </Fragment>
          ))}
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

export default Navs;
