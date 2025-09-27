"use client";

import clsx from "clsx";

interface Tab {
  title: string;
  component: () => React.JSX.Element;
}

interface Props {
  tabs: Tab[];
  currentTab: Tab;
  handleTab: (i: number) => void;
}

export default function Tabs(props: Props) {
  const { tabs, currentTab, handleTab } = props;

  return (
    <div className="flex items-center space-x-4 border-b bg-white p-[5px] rounded-[10px] border-gray-200 max-w-[400px] overflow-x-auto gray-scroll">
      {tabs.map((tab, index) => (
        <div key={tab.title} className="flex items-center">
          <button
            onClick={() => handleTab(index)}
            className={clsx(
              "relative px-3 py-2 text-sm font-normal transition-colors capitalize whitespace-nowrap cursor-pointer",
              currentTab.title === tab.title
                ? "bg-gray-300 rounded-[10px] text-black font-medium"
                : "text-gray-500 hover:text-gray-700"
            )}
          >
            {tab.title}
          </button>

          {/* Vertical divider except last one */}
          {index < tabs.length - 1 && (
            <div className="h-5 w-px bg-gray-200 mx-2" />
          )}
        </div>
      ))}
    </div>
  );
}
