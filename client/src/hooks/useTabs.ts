import { useState } from "react";

interface Props<T extends object> {
  tabs: T[];
}

const useTabs = <T extends object>(props: Props<T>) => {
  const { tabs } = props;

  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const handleTabIndex = (i: number) => {
    if (i >= 0 && i < tabs.length) {
      setCurrentTabIndex(i);
    }
  };

  return {
    tabs,
    currentTabIndex,
    handleTabIndex,
  };
};

export default useTabs;
