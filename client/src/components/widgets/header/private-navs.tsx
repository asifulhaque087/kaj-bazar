"use client";

import BecomeASeller from "@/components/widgets/header/button";
import NotificationDropdown from "@/components/widgets/header/notification-dropdown";
import ProfileDropdown from "@/components/widgets/header/profile-dropdown";
import UnreadMessageDropdown from "@/components/widgets/header/unread-message-dropdown";
import { useAuthStore } from "@/store/use-auth.store";

const PrivateNavs = () => {
  const { buyer } = useAuthStore();

  return (
    <>
      <UnreadMessageDropdown />
      <NotificationDropdown />

      <>
        {!buyer?.isSeller && <BecomeASeller />}
        <ProfileDropdown />
      </>
    </>
  );
};

export default PrivateNavs;
