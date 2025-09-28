import { useState } from "react";

interface Props<T extends object> {
  tabs: T[];
}

const useTabs = <T extends object>(props: Props<T>) => {
  const { tabs } = props;

  const [currentTab, setCurrentTab] = useState<T>(tabs[0]);

  const handleTab = (i: number) => {
    if (i >= 0 && i < tabs.length) {
      setCurrentTab(tabs[i]);
    }
  };

  return {
    tabs,
    currentTab,
    handleTab,
  };
};

export default useTabs;
