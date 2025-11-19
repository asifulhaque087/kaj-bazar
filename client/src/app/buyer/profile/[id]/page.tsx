"use client";
import OrderTable from "@/features/buyer/components/order-table";
import Tabs from "@/features/seller/components/tabs";
import Container from "@/components/container";
import ReviewCard from "@/features/review/components/review-card";
import { Card } from "@/components/ui/card";
import { buyerProfileTabs } from "@/constants";
import useTabs from "@/hooks/useTabs";
import { useParams } from "next/navigation";
import { useBuyerById } from "@/features/buyer/queries/use-buyer-by-id.query";

const page = () => {
  //   ** Params
  const params = useParams<{ id: string }>();

  // ** Queries
  const {
    data: buyer,
    isLoading,
    error,
  } = useBuyerById({
    id: params.id,
  });
  console.log("buyer is ", buyer);

  const { currentTabIndex, handleTabIndex, tabs } = useTabs({
    tabs: buyerProfileTabs,
  });

  return (
    <>
      <Container className="mt-[72px]">
        <section className="grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12 gap-[16px]">
          {/* box 1 */}
          <div
            className="min-h-[344px] col-span-4 md:col-span-5 flex flex-col px-[15px] pb-[28px] rounded-[10px] overflow-hidden"
            style={{
              backgroundImage: `linear-gradient(to bottom,rgba(255,255,255,.2),
                rgba(0,0,0, .7)), url(${buyer?.profilePicture})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <div className="mt-auto flex items-center justify-between">
              {/* flag */}
              {/* <span className="hidden">flag</span> */}
              <div className="flex flex-col gap-y-[8px] max-w-[168px] text-white font-[Roboto]">
                <h4 className="font-medium tracking-[0.56] leading-none text-sm">
                  Asiful Haque Mridul
                </h4>
                {/* <p className="text-xs font-extralight leading-none">
                I am a fullstack web developer. I create website here
              </p> */}
              </div>
              {/* <Button className="bg-[#6392D8] text-white">Contact</Button> */}
            </div>
          </div>

          {/* box 2 */}
          <div className="min-h-[344px] col-span-4 md:col-span-3 rounded-[10px] overflow-hidden">
            <ReviewCard
              ratingSum={buyer?.ratingSum!}
              ratingsCount={buyer?.ratingsCount!}
              ratingCategories={buyer?.ratingCategories}
            />
          </div>

          {/* box 3 */}

          <div className="min-h-[344px] col-span-4 md:col-span-8 xl:col-span-4 grid grid-cols-4 rounded-[10px] overflow-hidden gap-[1px] border-[1px] border-gray-200 bg-gray-200">
            {[...Array(4)].map((item, index) => (
              <Card
                key={index}
                className="col-span-2 grid place-items-center rounded-none border-none shadow-none"
              >
                <div className="grid place-items-center gap-y-[4px]">
                  <p className="font-roboto text-[32px] font-bold text-[#0E0F19]">
                    6
                  </p>
                  <span className="text-xs font-normal  text-[#3E3F47] ">
                    Total Gigs
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </Container>

      <Container className="mt-[72px]">
        <Tabs
          currentTabIndex={currentTabIndex}
          handleTabIndex={handleTabIndex}
          tabs={tabs}
        />
      </Container>

      <Container className="py-[72px]">
        <OrderTable />
      </Container>
    </>
  );
};

export default page;
