"use client";

import { categories, gigsLimit } from "@/constants";
import { useRouter } from "next/navigation";

const Categories = () => {
  const router = useRouter();

  return (
    <div className="flex items-center gap-x-[14px] overflow-auto  scrollbar-hide">
      {categories.map((cat, i) => (
        <button
          onClick={() =>
            router.push(
              `/gigs?category=${encodeURIComponent(
                cat
              )}&page=1&limit=${gigsLimit}`
            )
          }
          key={i}
          className={`${
            i % 2 === 0
              ? "bg-[rgba(99,146,216,15%)]"
              : "bg-[rgba(39,201,190,15%)]"
          } text-white px-[14px] py-[13px] text-[14px] tracking-[0.14px] font-[300] rounded-[8px] grid place-items-center capitalize whitespace-nowrap cursor-pointer`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default Categories;
