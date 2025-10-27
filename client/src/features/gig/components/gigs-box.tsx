import CategoryTab from "@/components/CategoryTab";
import { categories } from "@/constants";
import GigSlider from "@/features/gig/components/gig-slider";
import { useSearch } from "@/features/gig/queries/use-gigs.query";
import useTabs from "@/hooks/useTabs";

interface Props {}

const GigsBox = (props: Props) => {
  const { currentTabIndex, handleTabIndex, tabs } = useTabs({
    tabs: categories,
  });

  const { isLoading, data, error } = useSearch({
    q: `category=${encodeURIComponent(tabs[currentTabIndex])}`,
    page: 1,
    limit: 10,
  });

  return (
    <div className="rounded-[8px] bg-[#FCFCFD] overflow-hidden border  border-[#E4E5E7]">
      <header className="bg-[#616BA4] border-b border-[#E4E5E7] h-[72px] w-full flex items-center px-[24px]">
        <CategoryTab
          tabs={tabs}
          handleTabIndex={handleTabIndex}
          currentTabIndex={currentTabIndex}
        />
      </header>
      <section className="p-[24px]">
        <GigSlider
          gigs={data?.data || []}
          currentCategory={tabs[currentTabIndex]}
        />
      </section>
    </div>
  );
};

export default GigsBox;
