"use client";

import { CreateGigForm } from "@/schemas";
import { Image } from "lucide-react";
import { ChangeEvent, ReactNode } from "react";
import { FieldErrors, UseFieldArrayAppend } from "react-hook-form";

interface Props {
  children: ReactNode;
  errors: FieldErrors<CreateGigForm>;
  append: UseFieldArrayAppend<CreateGigForm>;
  fieldCount: number; // Add this line
}
const Grid = (props: Props) => {
  const { children, errors, append, fieldCount } = props;
  return (
    <div className="mx-auto p-[20px] sm:p-[40px] flex flex-col gap-y-[24px]">
      <div className="grid gap-[10px] sm:gap-[20px] grid-cols-1 sm:grid-cols-3 md:grid-cols-5">
        {children}
      </div>

      {/* <div className="rounded-md border border-[#d3d3d3] border-dashed bg-[#f9f8f8] cursor-pointer min-h-[200px] grid place-items-center">
        <div
          className={`grid place-items-center gap-y-[20px] ${
            errors.images?.message ? "text-red-500" : "text-[#2c2c2c]"
          } `}
        >
          <Image size={34} />
          <span className="text-[12px] sm:text-[16px] capitalize font-[500]">
            Add images
          </span>
        </div>
      </div> */}

      <input
        className="hidden"
        type="file"
        id="multi-images"
        multiple
        onChange={handleFileChange}
        // onChange={(e)=>{}}
      />

      <label
        htmlFor="multi-images"
        className="rounded-md border border-[#d3d3d3] border-dashed bg-[#f9f8f8] cursor-pointer min-h-[200px] grid place-items-center"
      >
        <div
          className={`grid place-items-center gap-y-[20px] ${
            errors.images?.message ? "text-red-500" : "text-[#2c2c2c]"
          } `}
        >
          <Image size={34} />
          <span className="text-[12px] sm:text-[16px] capitalize font-[500]">
            Add images
          </span>
        </div>
      </label>

      {errors.images?.message && (
        <p className="text-red-500 text-[14px]">At least one</p>
      )}
    </div>
  );

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    // console.log("the filed count is ", fieldCount);
    const files = Array.from(e.target.files ?? []);
    files.forEach((file, i) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        // const url  =  event?.target?.result!,

        append({
          // id: `new-img-${crypto.randomUUID()}`,
          orderId: i + 1 + fieldCount,
          url: event?.target?.result as string,
        });
      };
      reader.readAsDataURL(file);
    });

    // getV

    // const files = Array.from(e.target.files);
    // files.forEach((file) => {
    //   const reader = new FileReader();
    //   reader.onload = (event) => {
    //     append({
    //       id: `new-img-${crypto.randomUUID()}`,
    //       url: event.target.result,
    //       type: "new",
    //     });
    //   };
    //   reader.readAsDataURL(file);
    // });
  }
};

export default Grid;
