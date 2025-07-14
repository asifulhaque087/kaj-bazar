"use client";

import { Swiper as SwiperClass } from "swiper/types";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay } from "swiper/modules"; // <--- Import Autoplay module

// Import Swiper styles
import "swiper/css";
import { useCallback, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Gig from "@/components/Gig";

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
            <Gig gig={""} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MainSlider;
