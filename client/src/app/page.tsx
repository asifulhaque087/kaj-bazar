"use client";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Heart,
  Search,
  SearchIcon,
  Star,
  TrendingUp,
} from "lucide-react";

import { Autoplay } from 'swiper/modules'; // <--- Import Autoplay module


import { useCallback, useState } from "react";

export default function Home() {
  const categories = [
    {
      id: 1,
      title: "Designer",
    },

    {
      id: 2,
      title: "Developer",
    },

    {
      id: 3,
      title: "Wordpress",
    },
  ];

  return (
    <div className="px-[12px]">
      {/* Navigation */}

      <div className="mt-[24px]">
        <Navigation />
      </div>

      <div className="mt-[24px]">
        <Hero />
      </div>

      <div className="mt-[24px]">
        <NormalTab />
      </div>
      <div className="mt-[24px]">
        <MainSlider />
      </div>
    </div>
  );
}

const Navigation = () => {
  const menus = [
    {
      title: "home",
    },
    { title: "properties" },

    { title: "About" },
  ];

  return (
    <>
      <div className="flex items-center border-[#F2F2F2] border-[1px] bg-[#F8F8F8] rounded-[34px] px-[26px] py-[16px] gap-x-[52px] text-[16px] tracking-[-0.96px] text-[#838383] font-[400] capitalize">
        {/* logo */}

        <div className="flex gap-x-[2px] items-end">
          <span className="w-[7px] h-[15px] bg-[#27C9BE] rounded-[2px]" />
          <span className="w-[7px] h-[22px]  bg-[#6392D8] rounded-[2px]" />
          <span className="w-[7px] h-[22px] bg-[#27C9BE] rounded-[2px]" />
        </div>

        <div className="flex items-center gap-x-[52px] overflow-auto scrollbar-hide">
          {menus.map((menu, i) => (
            <div
              key={i}
              className={`${i === 0 ? "text-[#000] font-[700] " : null}`}
            >
              {menu.title}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

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

const Categories = () => {
  const categories = [
    {
      title: "Website Development",
    },
    { title: "Video Editing" },

    { title: "Vibe Coding" },
  ];

  return (
    <div className="flex items-center gap-x-[14px] overflow-auto  scrollbar-hide">
      {categories.map((cat, i) => (
        <button
          key={i}
          className={`${
            i % 2 === 0
              ? "bg-[rgba(99,146,216,15%)]"
              : "bg-[rgba(39,201,190,15%)]"
          } text-white px-[14px] py-[13px] text-[14px] tracking-[0.14px] font-[300] rounded-[8px] grid place-items-center capitalize whitespace-nowrap`}
        >
          {cat.title}
        </button>
      ))}
    </div>
  );
};

export const NormalTab = () => {
  const [active, setActive] = useState(0);

  const tabs = [
    {
      title: "Architect",
    },

    {
      title: "Graphics",
    },

    {
      title: "Development",
    },

    {
      title: "Coding",
    },

    {
      title: "Architect",
    },

    {
      title: "Graphics",
    },

    {
      title: "Development",
    },
  ];

  return (
    <div className="flex items-center justify-between bg-gray-100 py-[16px] px-[26px]  rounded-[10px]  overflow-x-auto gray-scroll gap-x-[20px]">
      {tabs.map((tab, i) => (
        <span
          key={i}
          className={`text-black text-[14px] tracking-[0.5px] cursor-pointer
          ${
            i == active &&
            "!bg-[#16B8E1] !text-white !rounded-[15px] !px-[10px] !py-[2px] grid place-items-center"
          }
          `}
          onClick={() => setActive(i)}
        >
          {tab.title}
        </span>
      ))}
    </div>
  );
};

import { Swiper as SwiperClass } from "swiper/types";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

// import { IMainSlider } from '@src/types/compounds';
// import { Product } from '../roots';

// export const MainSlider = ({ items }: IMainSlider) => {
export const MainSlider = ({ items }: any) => {
  const [swiperRef, setSwiperRef] = useState<SwiperClass>();

  // const theSlides = useMemo(() => ["slide one", "slide two"], []);

  const handlePrevious = useCallback(() => {
    swiperRef?.slidePrev();
  }, [swiperRef]);

  const handleNext = useCallback(() => {
    swiperRef?.slideNext();
  }, [swiperRef]);

  return (
    <div>
      {/* controll */}
      <div className="flex items-center gap-[10px] pb-[14px]">
        <button className="capitalize px-[14px] py-[10px]  outline-none rounded-[4px] border border-[#62646A] cursor-pointer">
          explore
        </button>

        <button
          className="ml-auto grid place-items-center outline-none border-none bg-[white] w-[32px] h-[32px] rounded-full shadow cursor-pointer"
          onClick={handlePrevious}
        >
          <ChevronLeft className="text-[#62646A]" size={24} />
        </button>

        <button
          className="grid place-items-center outline-none border-none bg-[white] w-[32px] h-[32px] rounded-full shadow cursor-pointer"
          onClick={handleNext}
        >
          <ChevronRight className="text-[#62646A]" size={24} />
        </button>
      </div>
      {/* slider */}
      <Swiper
        onSwiper={setSwiperRef}
        pagination={false}
        spaceBetween={10}
        slidesPerView={"auto"}
        allowTouchMove={true}
      modules={[Autoplay]} // <--- Add Autoplay to modules

        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        className="!p-[2px] "
      >
        {[...Array(16)].map((item, i) => (
          <SwiperSlide key={i} className="!w-fit py-[10px]">
            <Product product={""} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

import Link from "next/link";

// export const Product: React.FC<{ product: IProduct }> = (props) => {
export const Product = ({ product }: { product: any }) => {
  return (
    <>
      {/* main 200px 640 oile 150px  r tailwind a sm oise 767 porjonto mane 768 oile md suru */}
      {/* <div className="shadow-md w-[150px] sm:w-[200px]  border-[10px] border-red-500"> */}
      <div className="w-[262px] rounded-[24px] shadow-lg border border-[#E4E5E7] ">
        {/* Header */}

        <div className="flex items-center gap-x-[12px] px-[12px] py-[15px]">
          {/* left */}
          <div className="w-[24px] h-[24px] rounded-full overflow-hidden">
            <img
              src="https://www.shutterstock.com/image-vector/vector-bright-portrait-beautiful-brunette-600nw-2452267975.jpg"
              alt="profile"
              className="object-center object-cover h-full w-full"
            />
          </div>
          {/* right */}

          <div>
            <h4 className="font-inter font-[600] text-[14px] text-[#222325]">
              cc__creative
            </h4>

            <p className="font-inter font-[500] text-[12.48px] text-[#2E90EB] mt-[4px]">
              Top Rated Seller
            </p>
          </div>
        </div>

        {/* Image Box */}

        <Link href={`/gig/l`} className="w-full">
          <div className="px-[12px]">
            <div className="h-[148px] w-full rounded-[7px] overflow-hidden bg-red-500">
              <img
                src="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/435057859/original/b1178ebc894adffee3df9f46a3af8378c41f21c2/build-secure-and-scalable-backend-apis-with-nodejs-express.png"
                alt="product"
                className="h-full w-full  object-center object-cover"
              />
            </div>
          </div>
        </Link>

        {/* Love Box */}

        <div className="flex items-center gap-x-[10px] px-[25px] py-[7px]">
          <Heart fill="#B5B6BA" size={22} color="#B5B6BA" />

          <span className="font-inter font-[400] text-[12.48px] text-[#B5B6BA]">
            32.4K
          </span>
        </div>

        {/* Title */}

        {/* <h1 className="font-inter  font-[400] text-[16px] leading-[1.375] text-[#222325] px-[25px] h-[42px] overflow-hidden bg-red-500">
          I will design UI UX for mobile app with figma for ios
        </h1> */}

        <h1 className="font-inter font-[400] text-[16px] leading-[1.375] text-[#222325] px-[25px] h-[42px] overflow-hidden line-clamp-2">
          I will design UI UX for mobile app with figma for ios I will design UI
          UX for mobile app with figma for ios I will design UI UX for mobile
          app with figma for ios I will design UI UX for mobile app with figma
          for ios
        </h1>

        {/* Rating */}

        <div className="flex items-center px-[25px] mt-[4px] gap-x-[5px]">
          {/* icon */}

          <Star size={15} fill="#FFBE5B" color="#FFBE5B" />

          {/* raing */}
          <span className="font-inter text-[12px] font-[700] text-[#FFBE5B] ">
            5.0
          </span>

          {/* reviews */}

          <span className="font-inter font-[400] text-[12.48px] text-[#B5B6BA]">
            32.4K
          </span>
        </div>

        {/* pricing */}

        <div className="flex items-center  gap-x-[7px] py-[13px] px-[25px]">
          <p className="uppercase text-[#74767E] text-[7px] font-inter font-[700] tracking-[0.31px]">
            starting at
          </p>
          <span className="text-[#2E90EB] font-inter font-[400] text-[12.26px]">
            $8,674
          </span>
        </div>
      </div>
    </>
  );
};

// export default Navigation
