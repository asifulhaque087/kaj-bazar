"use client";

import { CreateGigForm } from "@/schemas";
import { FieldErrors } from "react-hook-form";

interface Props {
  totalItems: number;
  removePhotos: () => void;
  // errors: FieldErrors<CreateGigForm>;
}
const Header = (props: Props) => {
  const { totalItems, removePhotos } = props;

  // const errorMessage = errors?.images?.message;

  return (
    <div
      className={`px-[3%] flex items-center border-b justify-between h-[70px] `}
    >
      {totalItems ? (
        <>
          <h1 className="text-[24px] text-[#353535] font-[700] capitalize">
            {totalItems}
            {totalItems === 1 ? " file " : " files "}
            selected
          </h1>
          <span
            className="text-[#f15151] text-[16px] font-[600] cursor-pointer"
            onClick={() => removePhotos()}
          >
            Delete {totalItems === 1 ? " file " : " files "}
          </span>
        </>
      ) : (
        <h1 className="text-[24px] text-[#353535] font-[700] capitalize">
          gallery
        </h1>
      )}
    </div>
  );
};

export default Header;
