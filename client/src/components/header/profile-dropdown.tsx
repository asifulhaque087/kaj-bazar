import CustomDropdown from "@/components/header/dropdown";
import DropdownMenu from "@/components/header/dropdown-menu";
import { useAuthStore } from "@/store/use-auth.store";
import { LayoutDashboard, LogOut, PackagePlus, UserCog } from "lucide-react";
import Link from "next/link";

const ProfileDropdown = () => {
  const { authUser, role, buyer } = useAuthStore();

  const trigger = (
    <div className="w-[40px] h-[40px] rounded-full bg-[#FEFEFF] cursor-pointer overflow-hidden">
      <img src={authUser?.profilePicture} alt="profile" />
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
            role === "buyer"
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
        {((role === "buyer" && buyer?.isSeller) || role === "seller") && (
          <DropdownMenu
            Icon={UserCog}
            title={`switch to ${role === "buyer" ? "selling" : "buying"}`}
            isBtn
            link={
              role === "buyer"
                ? `/seller/profile/${authUser?.id}`
                : `/buyer/profile/${authUser?.id}`
            }
          />
        )}
        <DropdownMenu
          Icon={LayoutDashboard}
          title="Dashboard"
          link={
            role === "buyer"
              ? `/buyer/profile/${authUser?.id}`
              : `/seller/profile/${authUser?.id}`
          }
        />
        {role === "seller" && (
          <DropdownMenu
            Icon={PackagePlus}
            title="Add a new gig"
            link="/gig/create"
          />
        )}
      </div>

      {/* footer */}
      <div className="p-[16px] gap-y-[8px] border-t border-[#E7E7E8]">
        <DropdownMenu Icon={LogOut} title="Log Out" />
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
