"use client";

// ** Components Imports
import Container from "@/components/container";
import Logo from "@/components/widgets/header/logo";
import Navs from "@/components/widgets/header/navs";
import SearchBox from "@/components/widgets/header/search-box";

const Header = () => {
  return (
    <Container className="bg-[#616BA4]] bg-green-500">
      <header className="flex flex-col md:flex-row md:gap-x-[34px] gap-y-[24px] items-center justify-center py-[24px]">
        <Logo />
        <SearchBox className="w-full" />
        <Navs />
      </header>
    </Container>
  );
};

export default Header;
