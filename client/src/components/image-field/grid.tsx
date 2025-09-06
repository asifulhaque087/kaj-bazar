"use client";

import { Image } from "lucide-react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const Grid = (props: Props) => {
  const { children } = props;
  return (
    <div className="mx-auto p-[20px] sm:p-[40px] flex flex-col gap-y-[24px]">
      <div className="grid gap-[10px] sm:gap-[20px] grid-cols-1 sm:grid-cols-3 md:grid-cols-5">
        {children}
      </div>

      <div className="rounded-md border border-[#d3d3d3] border-dashed bg-[#f9f8f8] cursor-pointer min-h-[200px] grid place-items-center">
        <div className="grid place-items-center gap-y-[20px]">
          <Image size={34} color="#2c2c2c" />
          <span className="text-[12px] sm:text-[16px] capitalize font-[500] text-[#2c2c2c]">
            Add images
          </span>
        </div>
      </div>
    </div>
  );
};

export default Grid;
