"use client";

import Categories from "@/components/Categories";
import { ArrowRight, SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface FormValue {
  searchInput: string;
}

const Hero = () => {
  const router = useRouter();

  const { register, handleSubmit } = useForm<FormValue>({
    defaultValues: {
      searchInput: "",
    },
  });

  return (
    <div className="grid grid-cols-12 row-span-2 gap-[24px]">
      {/* --- 1st box --- */}
      <div className="col-span-12 xl:col-span-6  row-span-2 rounded-[14px] bg-[#0D0E12] min-h-[474px] xl:min-h-[574px] relative overflow-hidden px-[14px] flex justify-center items-center">
        <div className="flex gap-x-[24px] rotate-[15deg] items-end opacity-[5%] absolute -top-[2%] left-[15%]">
          <span className="w-[94px] h-[292px] bg-[#27C9BE]  rounded-[12px]" />
          <span className="w-[94px] h-[292px]  bg-[#6392D8] rounded-[12px]" />
          <span className="w-[94px] h-[292px] bg-[#27C9BE] rounded-[12px]" />
        </div>

        {/* main content */}
        <main className="w-full">
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

          <form
            className="flex items-center  justify-between w-full  bg-[#E8E7D9] rounded-[12px] border border-gray-300 transition-all duration-300 ease-in-out pl-[16px] pr-[6px] py-[5px] mt-[24px]"
            onSubmit={handleSubmit((data) =>
              router.push(
                `/gigs?searchKey=${encodeURIComponent(
                  data.searchInput
                )}&page=1&limit=5`
              )
            )}
          >
            {/* Input Field */}
            <input
              {...register("searchInput")}
              type="text"
              placeholder="Search For Gigs"
              className="placeholder:tracking-[0.14px] placeholder:text-[16px] placeholder:font-[500]   placeholder-[#735858] bg-transparent outline-none focus:outline-none font-inter grow"
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
        </main>
      </div>

      {/* --- 2nd box --- */}
      <div
        className="col-span-6 xl:col-span-3  row-span-1 min-h-[150px] md:min-h-[200px] xl:min-h-auto overflow-hidden rounded-[13px]"
        style={{
          backgroundImage: `url("https://plus.unsplash.com/premium_photo-1681487178876-a1156952ec60?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        {/* <button className="px-6 py-3 rounded-[9px] text-white text-xl font-semibold blur-[20] bg-[rgba(39,201,190,10)]">
          Architect
        </button> */}
      </div>

      {/* --- 3rd box --- */}
      <div
        className="col-span-6 xl:col-span-3  row-span-1 overflow-hidden rounded-[13px]"
        style={{
          backgroundImage: `url("https://plus.unsplash.com/premium_photo-1661904185181-ea4531c2116c?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        {/* <button className="px-6 py-3 rounded-[9px] text-white text-xl font-semibold blur-[20] bg-[rgba(39,201,190,10)]">
          Architect
        </button> */}
      </div>

      {/* --- 4th box --- */}
      <div
        className="col-span-12 xl:col-span-6  row-span-1 min-h-[150px] md:min-h-[200px] xl:min-h-auto overflow-hidden rounded-[13px]"
        style={{
          backgroundImage: `url("https://plus.unsplash.com/premium_photo-1661903986017-673f1bd6b47e?q=80&w=1520&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        {/* <button className="px-6 py-3 rounded-[9px] text-white text-xl font-semibold blur-[20] bg-[rgba(39,201,190,10)]">
          Architect
        </button> */}
      </div>
    </div>
  );

  function onSubmit(data: FormValue) {
    console.log("the new combination data is ", data);
  }
};

export default Hero;
