"use client";

// ** Components Imports
import Container from "@/components/container";
import SearchBox from "@/components/header/search-box";
import Logo from "@/components/header/logo";
import Navs from "@/components/header/navs";

const Header = () => {
  return (
    <Container className="bg-[#616BA4]">
      <header className="flex flex-col md:flex-row md:gap-x-[34px] gap-y-[24px] items-center justify-center py-[24px]">
        <Logo />
        <SearchBox className="w-full" />
        <Navs />
      </header>
    </Container>
  );
};

export default Header;
