import BecomeASeller from "@/components/widgets/header/button";
import NotificationDropdown from "@/components/widgets/header/notification-dropdown";
import ProfileDropdown from "@/components/widgets/header/profile-dropdown";
import UnreadMessageDropdown from "@/components/widgets/header/unread-message-dropdown";
import LoginModal from "@/features/auth/components/login-modal";
import RegisterModal from "@/features/auth/components/register-modal";
import { useAuthStore } from "@/store/use-auth.store";
import { useChatStore } from "@/store/use-chat.store";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";

interface Props {
  className?: string;
}

const navs = [
  { title: "Login", path: "" },
  { title: "Register", path: "" },
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

        {authUser && <UnreadMessageDropdown />}
        {authUser && <NotificationDropdown />}

        {authUser && (
          <>
            {!buyer?.isSeller && <BecomeASeller />}
            <ProfileDropdown />
          </>
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
    </>
  );
};

export default Navs;
