"use client";

import { useBrowser } from "@/hooks/use-browser.hook";
import { shuffleArray } from "@/utils/shuffle-array.utils";
import { Dispatch, SetStateAction } from "react";

interface CategoryTabProps {
  setActiveCategory: Dispatch<SetStateAction<string>>;
  activeCategory: string;
}

const categories = [
  "Graphics & Design",
  "Digital Marketing",
  "Writing & Translation",
  "Video & Animation",
  "Music & Audio",
  "Programming & Tech",
  "Photography",
  "Data",
  "Business",
];

const tabs = shuffleArray(categories);

export const CategoryTab = (props: CategoryTabProps) => {
  // ** Props

  const { setActiveCategory, activeCategory } = props;

  const browser = useBrowser();

  console.log("tabs are ", tabs);

  // const tabs = [
  //   {
  //     title: "Architect",
  //   },

  //   {
  //     title: "Graphics",
  //   },

  //   {
  //     title: "Development",
  //   },

  //   {
  //     title: "Coding",
  //   },

  //   {
  //     title: "Architect",
  //   },

  //   {
  //     title: "Graphics",
  //   },

  //   {
  //     title: "Development",
  //   },
  // ];

  if (!browser) return;

  return (
    <div className="flex items-center justify-between bg-gray-100 py-[16px] px-[26px]  rounded-[10px]  overflow-x-auto gray-scroll gap-x-[20px]">
      {tabs.map((tab, i) => (
        <span
          key={i}
          className={`text-black whitespace-nowrap text-[14px] tracking-[0.5px] cursor-pointer
          ${
            tab == activeCategory &&
            "!bg-[#16B8E1] !text-white !rounded-[15px] !px-[10px] !py-[2px] grid place-items-center"
          }
          `}
          onClick={() => onSelect(i)}
        >
          {tab}
        </span>
      ))}
    </div>
  );

  // ** --- Functions ---
  function onSelect(i: number) {
    setActiveCategory(tabs[i]);
  }
};

export default CategoryTab;
