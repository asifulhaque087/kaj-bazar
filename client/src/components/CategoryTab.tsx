"use client";

import { useBrowser } from "@/hooks/use-browser.hook";

interface CategoryTabProps {
  tabs: string[];
  handleTabIndex: (i: number) => void;
  currentTabIndex: number;
}

export const CategoryTab = (props: CategoryTabProps) => {
  // ** Props

  const { handleTabIndex, currentTabIndex, tabs } = props;

  const browser = useBrowser();

  if (!browser) return;

  return (
    <div className="flex items-center justify-between overflow-x-auto gray-scroll gap-x-[20px] h-full">
      {tabs.map((tab, i) => (
        <span
          key={i}
          className={`text-[#F7F7FA] px-[20px] py-[3px] whitespace-nowrap font-roboto  font-normal text-[16px] tracking-[0.64px]] cursor-pointer
          ${
            i == currentTabIndex &&
            "bg-[#9FBB89] text-white rounded-[8] px-[10px] py-[2px]"
          }
          `}
          onClick={() => handleTabIndex(i)}
        >
          {tab}
        </span>
      ))}
    </div>
  );
};

export default CategoryTab;
