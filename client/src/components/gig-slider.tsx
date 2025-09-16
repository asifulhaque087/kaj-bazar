"use client";
// ** Third Party Imports
import { useCallback, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ** Swipper Imports
import { Swiper as SwiperClass } from "swiper/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

// ** Components Imports
import GigCard from "@/components/gig-card";
import { Gig } from "@/schemas";
import { useRouter } from "next/navigation";
import { gigsLimit } from "@/constants";

interface IGigSlider {
  gigs: Gig[];
  currentCategory: string;
}

const GigSlider = (props: IGigSlider) => {
  // ** --- Props ---
  const { gigs, currentCategory } = props;

  const router = useRouter();

  const [swiperRef, setSwiperRef] = useState<SwiperClass>();

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
        <button
          className="capitalize px-[14px] py-[10px]  outline-none rounded-[4px] border border-[#62646A] cursor-pointer"
          onClick={() =>
            router.push(
              `/gigs?category=${encodeURIComponent(
                currentCategory
              )}&page=1&limit=${gigsLimit}`
            )
          }
        >
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
        modules={[Autoplay]}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        // className="!p-[2px]"
        className="!p-[2px]"
      >
        {gigs.map((gig, i) => (
          // <SwiperSlide key={i} className="!w-fit py-[10px]">
          <SwiperSlide key={i} className="!w-fit py-[10px]">
            <GigCard gig={gig} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default GigSlider;
