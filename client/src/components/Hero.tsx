import Categories from "@/components/Categories";
import { ArrowRight, SearchIcon } from "lucide-react";

const Hero = () => {
  return (
    <>
      <div className="rounded-[14px] bg-[#0D0E12] min-h-[474px] relative overflow-hidden px-[14px]">
        {/* Background */}
        <div className="flex gap-x-[24px] rotate-[15deg] items-end opacity-[5%] absolute -top-[2%] left-[15%]">
          <span className="w-[94px] h-[292px] bg-[#27C9BE]  rounded-[12px]" />
          <span className="w-[94px] h-[292px]  bg-[#6392D8] rounded-[12px]" />
          <span className="w-[94px] h-[292px] bg-[#27C9BE] rounded-[12px]" />
        </div>

        {/* main content */}

        <button className="capitalize bg-[#6594D3] outline-none border-none px-[24px] py-[8px] flex items-center gap-x-[4px] rounded-[19px] mt-[60px] mx-auto">
          <span className="-tracking-[0.14px] text-white font-[500]">
            join us
          </span>
          <ArrowRight className="-rotate-[35deg]" size={18} color="white" />
        </button>

        <h1 className="font-[roboto] text-[30px] font-[700] text-white text-center mt-[34px] tracking-[1.2px] leading-[1.4633]">
          Let’s Hunt For Your Dream
          <span className="text-[#6594D3]"> Property </span>
        </h1>

        <p className="text-[14px] tracking-[0.56px] text-[#fff] mt-[12px] text-center leading-[1.71]">
          Explore our range of beautiful properties with the addition of
          separate accommodation suitable for you.
        </p>

        {/* Search Box */}

        <form className="flex items-center  justify-between w-full  bg-[#E8E7D9] rounded-[12px] border border-gray-300 transition-all duration-300 ease-in-out pl-[16px] pr-[6px] py-[5px] mt-[24px]">
          {/* Input Field */}
          <input
            type="text"
            placeholder="Search For Gigs"
            className="placeholder:tracking-[0.14px] placeholder:text-[16px] placeholder:font-[500]   placeholder-[#735858] bg-transparent outline-none focus:outline-none font-inter"
          />

          <button
            type="submit"
            className=" bg-[#27C9BE]  p-[8px] grid place-items-center rounded-[8px] cursor-pointer hover:bg-[#20A89F] transition-all duration-200 ease-in- transform hover:scale-105 active:scale-95"
          >
            <SearchIcon size={20} color="white" />
          </button>
        </form>

        {/* Categories */}
        <div className="py-[32px]">
          <Categories />
        </div>
      </div>
    </>
  );
};

export default Hero;
