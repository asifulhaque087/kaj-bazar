import CategoryTab from "@/components/CategoryTab";
import GigCard from "@/features/gig/components/gig-card";
import GigSlider from "@/features/gig/components/gig-slider";
import { Gig } from "@/features/gig/schemas/gig.schema";

interface Props {
  tabs: string[];
  handleTabIndex: (i: number) => void;
  currentTabIndex: number;
  gigs: Gig[];
  isSlider?: boolean;
}

const GigsBox = (props: Props) => {
  // **  --- props ---
  const {
    tabs,
    currentTabIndex,
    handleTabIndex,
    gigs,
    isSlider = false,
  } = props;

  return (
    <div className="rounded-[8px] bg-[#FCFCFD] overflow-hidden border  border-[#E4E5E7]">
      <header className="bg-[#616BA4] border-b border-[#E4E5E7] h-[72px] w-full flex items-center px-[24px]">
        <CategoryTab
          tabs={tabs}
          handleTabIndex={handleTabIndex}
          currentTabIndex={currentTabIndex}
        />
      </header>

      {!gigs.length && (
        <div className="min-h-[358px] grid place-items-center">
          No Gigs found
        </div>
      )}

      {!!gigs.length && isSlider && (
        <section className="p-[24px]">
          <GigSlider gigs={gigs} currentCategory={tabs[currentTabIndex]} />
        </section>
      )}

      {!!gigs.length && !isSlider && (
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 p-6">
          {gigs.map((gig) => (
            <GigCard gig={gig} key={gig.id} fluid />
          ))}
        </section>
      )}
    </div>
  );
};

export default GigsBox;
