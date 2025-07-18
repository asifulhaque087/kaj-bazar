"use client";

import { Dispatch, SetStateAction, useState } from "react";

interface CategoryTabProps {
  setActiveCategory: Dispatch<SetStateAction<string | undefined>>;
}

export const CategoryTab = (props: CategoryTabProps) => {
  // ** Props

  const { setActiveCategory } = props;

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
          onClick={() => onSelect(i)}
        >
          {tab.title}
        </span>
      ))}
    </div>
  );

  // ** Functions

  function onSelect(i: number) {
    setActive(i);

    if (setActiveCategory) setActiveCategory(tabs[i].title);
  }
};

export default CategoryTab;
