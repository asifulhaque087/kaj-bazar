import CustomDropdown from "@/components/widgets/header/dropdown";
import DropdownMenu from "@/components/widgets/header/dropdown-menu";
import { useLogout } from "@/features/auth/mutations/use-logout.mutation";
import { useAuthStore } from "@/store/use-auth.store";
import { LayoutDashboard, LogOut, PackagePlus, UserCog } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ProfileDropdown = () => {
  // ** --- store ---
  const { authUser, activeRole, buyer } = useAuthStore();

  // ** --- mutations ---

  const { mutate: logout } = useLogout();

  const trigger = (
    <div className="relative w-[40px] h-[40px] rounded-full bg-[#FEFEFF] cursor-pointer overflow-hidden">
      <Image
        className="absolute w-full h-full object-center object-cover"
        src={authUser?.profilePicture ?? "https://robohash.org/99?size=200x200"}
        alt="profile"
        fill
      />
    </div>
  );
  const content = (
    <div className="w-full">
      {/* header */}
      <div className="p-[16px] gap-y-[8px] border-b border-[#E7E7E8]">
        <h6 className="capitalize text-[#0E0F19] font-roboto font-normal text-sm">
          {authUser?.username}
        </h6>
        <Link
          href={
            activeRole === "buyer"
              ? `/buyer/profile/${authUser?.id}`
              : `/seller/profile/${authUser?.id}`
          }
          className="text-[#6E6F75] font-roboto font-normal text-xs capitalize"
        >
          view profile
        </Link>
      </div>
      {/* body */}
      <div className="flex flex-col gap-y-[16px] p-[16px]">
        {((activeRole === "buyer" && buyer?.isSeller) ||
          activeRole === "seller") && (
          <DropdownMenu
            Icon={UserCog}
            title={`switch to ${activeRole === "buyer" ? "selling" : "buying"}`}
            isBtn
            link={
              activeRole === "buyer"
                ? `/seller/profile/${authUser?.id}`
                : `/buyer/profile/${authUser?.id}`
            }
          />
        )}
        <DropdownMenu
          Icon={LayoutDashboard}
          title="Dashboard"
          link={
            activeRole === "buyer"
              ? `/buyer/profile/${authUser?.id}`
              : `/seller/profile/${authUser?.id}`
          }
        />
        {activeRole === "seller" && (
          <DropdownMenu
            Icon={PackagePlus}
            title="Add a new gig"
            link="/gig/create"
          />
        )}
      </div>

      {/* footer */}
      <div className="p-[16px] gap-y-[8px] border-t border-[#E7E7E8]">
        <DropdownMenu Icon={LogOut} title="Log Out" onClick={() => logout()} />
      </div>
    </div>
  );

  return (
    <CustomDropdown
      contentClassName="rounded-[4px] bg-[#FEFEFF] min-w-[220px]"
      trigger={trigger}
      content={content}
      align="end"
    />
  );
};

export default ProfileDropdown;
