"use client";

// ** Third Party Imports
import { Fragment, useState } from "react";

// ** Components Imports
import LoginModal from "@/components/login-modal";
import RegisterModal from "@/components/register-modal";
import { ArrowRight, Hamburger, MoveUpRight } from "lucide-react";
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
import Container from "@/components/container";
import SearchBox from "@/components/header/search-box";
import Logo from "@/components/header/logo";
import UnprotectedNavs from "@/components/header/unprotected-navs";
import BecomeASeller from "@/components/header/button";

const Header = () => {
  const [activeItem, setActiveItem] = useState(-1);
  const router = useRouter();

  const { authUser, buyer, seller, role } = useAuthStore();

  return (
    <Container className="bg-[#616BA4]">
      <div className="min-h-[114px] grid grid-cols-12 gap-[16px] py-[16px] md:py-[24px]">
        <div className="order-1 col-span-6 md:col-span-3 xl:col-span-2 flex items-center justify-start xl:justify-start">
          <Logo />
        </div>
        <div className="order-3 md:order-4 xl:order-2 col-span-12 xl:col-span-6 grid place-items-center">
          <SearchBox />
        </div>

        <div className="order-4 md:order-2 md:col-span-6 xl:order-3 col-span-12 xl:col-span-2 flex items-center justify-center xl:justify-end">
          <UnprotectedNavs />
        </div>

        <div className="order-2 md:order-3 md:col-span-3 xl:order-4 col-span-6 xl:col-span-2 flex justify-end items-center">
          <BecomeASeller />
        </div>
      </div>
    </Container>
  );

  // return (
  //   <Container className="bg-[#616BA4]">
  //     <div className="min-h-[114px] flex items-center gap-x-[80px]">
  //       <Logo />
  //       <SearchBox />
  //       <UnprotectedNavs />
  //       <BecomeASeller />
  //     </div>
  //   </Container>
  // );
};

export default Header;
