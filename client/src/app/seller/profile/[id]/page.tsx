"use client";
import { useSellerById } from "@/api/sellers";
import Tabs from "@/app/seller/profile/[id]/tabs";
import useTabs from "@/app/seller/profile/[id]/useTabs";
import ReviewCard from "@/components/review-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useParams } from "next/navigation";
import React from "react";

const page = () => {
  //   ** Params
  const params = useParams<{ id: string }>();

  // ** Queries
  const {
    data: seller,
    isLoading,
    error,
  } = useSellerById({
    sellerId: params.id,
  });
  // console.log("seller is ", seller);

  const { currentTab, handleTab, tabs } = useTabs();

  return (
    <>
      <section className="grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12 gap-[16px]">
        {/* box 1 */}
        <div
          className="col-span-4 md:col-span-5 flex flex-col px-[15px] pb-[28px] rounded-[10px] overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(to bottom,rgba(255,255,255,.2),
                rgba(0,0,0, .7)), url(${seller?.profilePicture})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="mt-auto flex items-center justify-between">
            {/* flag */}
            <span className="hidden">flag</span>
            <div className="flex flex-col gap-y-[8px] max-w-[168px] text-white font-[Roboto]">
              <h4 className="font-medium tracking-[0.56] leading-none text-sm">
                Asiful Haque Mridul
              </h4>
              <p className="text-xs font-extralight leading-none">
                I am a fullstack web developer. I create website here
              </p>
            </div>
            <Button className="bg-[#6392D8] text-white">Contact</Button>
          </div>
        </div>

        {/* box 2 */}
        <div className="col-span-4 md:col-span-3 rounded-[10px] overflow-hidden">
          <ReviewCard
            ratingSum={seller?.ratingSum!}
            ratingsCount={seller?.ratingsCount!}
            ratingCategories={seller?.ratingCategories}
          />
        </div>

        {/* box 3 */}

        <div className="w-full col-span-4 md:col-span-8 xl:col-span-4 grid grid-cols-4 rounded-[10px] overflow-hidden gap-[1px] border-[1px] border-gray-200 bg-gray-200">
          {[...Array(4)].map((item, index) => (
            <Card
              key={index}
              className="col-span-2 grid place-items-center rounded-none border-none shadow-none"
            >
              <div className="grid place-items-center gap-y-[4px]">
                <p className="text-sm font-normal">Total Gigs</p>
                <span className="text-sm font-bold">0</span>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-[24px]">
        <Tabs tabs={tabs} currentTab={currentTab} handleTab={handleTab} />
      </section>

      <section className="mt-[24px]">
        <currentTab.component />
      </section>
    </>
  );
};

export default page;
