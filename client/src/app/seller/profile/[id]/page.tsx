"use client";
import Tabs from "@/features/seller/components/tabs";
import useTabs from "@/hooks/useTabs";
import Container from "@/components/container";
import ReviewCard from "@/features/review/components/review-card";
import { Button } from "@/components/ui/button";
import { alltabs } from "@/constants";
import { useParams } from "next/navigation";
import React from "react";
// import { useAuthStore } from "@/store/use-auth.store";
import StatisticCard from "@/features/seller/components/statistic-card";
import Overview from "@/features/seller/components/overview";
import RaitingAndReviews from "@/features/seller/components/rating-and-review";
import { useSellerById } from "@/features/seller/queries/use-seller-by-id.query";
import SellerGigs from "@/features/seller/components/seller-gigs";
import { DataTable } from "@/components/data-table";
import { Order } from "@/features/order/schemas/order.schema";
import { createColumnHelper } from "@tanstack/react-table";
import Image from "next/image";
import { format, parseISO } from "date-fns";
import {
  OrderStatus,
  useSellerOrdersQuery,
} from "@/features/order/queries/use-seller-orders.query";
import { useSellerReviews } from "@/features/review/queries/use-seller-reviews.query";
import ReviewList from "@/components/review-list";
// import { useFindOrCreateConversation } from "@/features/chat/mutations/use-get-or-create-conversation.mutation";

const columnHelper = createColumnHelper<Order>();
const columns = [
  columnHelper.accessor(
    // (order) => `${order.gig.coverImage} ${order.gig.title}`,
    (order) => ({ gigImage: order.gig.coverImage, gigTitle: order.gig.title }),
    {
      id: "gig",
      header: () => <p>Gig</p>,
      // header: () => <p></p>,
      cell: (info) => {
        const { gigImage, gigTitle } = info.getValue();

        return (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Image
              width={200}
              height={200}
              src={gigImage}
              alt={`Cover image for ${gigTitle}`}
              style={{
                width: "50px",
                height: "50px",
                objectFit: "cover",
                borderRadius: "4px",
              }}
            />

            {/* Title */}
            <span style={{ fontWeight: "600", color: "#333" }}>{gigTitle}</span>
          </div>
        );
      },
    }
  ),

  columnHelper.accessor("orderStartedAt", {
    header: () => <p>Order Date</p>,
    cell: (info) => {
      const dateValue = info.getValue();

      // return dateValue ? format(parseISO(dateValue), "MMMM d, yyy") : "-";
      return dateValue ? format(parseISO(dateValue), "d MMMM yyy") : "-";
    },
  }),

  columnHelper.accessor("deliveryDueDate", {
    header: () => <p>Due Date</p>,
    cell: (info) => {
      const dateValue = info.getValue();
      // MMMM Do yyy, h:mm:ss a

      return dateValue ? format(parseISO(dateValue), "d MMMM yyy") : "-";
      // return dateValue ? format(parseISO(dateValue), "MMMM d y") : "-";
    },
  }),

  columnHelper.accessor("price", {
    header: () => <p>Total</p>,
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("orderStatus", {
    header: () => <p>Status</p>,
    cell: (info) => info.getValue(),
  }),
];

const Page = () => {
  //   ** Params
  const params = useParams<{ id: string }>();

  // ** Store
  // const { authUser } = useAuthStore();

  // ** Mutations

  // const { mutate: findOrCreateConversation } = useFindOrCreateConversation();

  // ** Queries
  const {
    data: seller,
    isLoading,
    // error,
  } = useSellerById({
    sellerId: params.id,
  });

  const { data: reviews } = useSellerReviews({
    sellerId: params.id,
  });

  const { currentTabIndex, handleTabIndex, tabs } = useTabs({ tabs: alltabs });

  const orderStatus = [
    "status=progress",
    "status=complete",
    "status=incomplete",
  ];

  const { data: orders } = useSellerOrdersQuery({
    sellerId: params.id,
    // q: orderStatus[currentTabIndex] as OrderStatus,
  });

  if (isLoading) return null;

  console.log("seller is ", seller);

  return (
    <>
      <Container className="mt-[72px]">
        <section className="grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12 gap-[16px]">
          {/* box 1 */}
          <div
            className="min-h-[344px] col-span-4 md:col-span-5 flex flex-col px-[15px] pb-[28px] rounded-[10px] overflow-hidden"
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
                  {seller?.username}
                </h4>
                <p className="text-xs font-extralight leading-none">
                  {seller?.oneliner}
                </p>
              </div>
              <Button
                className="bg-[#6392D8] text-white"
                // onClick={() =>
                //   findOrCreateConversation({
                //     receiverUsername: gig.username!,
                //     senderUsername: authUser?.username!,
                //   })
                // }
              >
                Contact
              </Button>
            </div>
          </div>

          {/* box 2 */}
          <div className="min-h-[344px] col-span-4 md:col-span-3 rounded-[10px] overflow-hidden">
            <ReviewCard
              ratingSum={seller?.ratingSum}
              ratingsCount={seller?.ratingsCount}
              ratingCategories={seller?.ratingCategories}
            />
          </div>

          {/* box 3 */}

          <div className="min-h-[344px] w-full col-span-4 md:col-span-8 xl:col-span-4 grid grid-cols-4 rounded-[10px] overflow-hidden gap-[1px] border-[1px] border-gray-200 bg-gray-200">
            <StatisticCard
              className="col-span-2"
              title="total gigs"
              count={seller?.totalGigs}
              // count={6}
            />
            <StatisticCard
              className="col-span-2"
              title="completed orders"
              count={seller?.totalGigs}
              // count={10}
            />
            <StatisticCard
              className="col-span-4"
              title="ongoing orders"
              // count={seller.ongoingJobs}
              count={3}
            />
          </div>
        </section>
      </Container>

      <Container>
        <section className="mt-[72px]">
          <Tabs
            tabs={tabs}
            currentTabIndex={currentTabIndex}
            handleTabIndex={handleTabIndex}
          />
        </section>
      </Container>

      <Container className="py-[72px]">
        {/* {tabs[currentTabIndex].component()} */}
        {currentTabIndex === 0 && <Overview seller={seller!} />}
        {currentTabIndex === 1 && <SellerGigs sellerId={params.id} />}
        {currentTabIndex === 2 && (
          <DataTable<Order, any> columns={columns} data={orders ?? []} />
        )}
        {/* {currentTabIndex === 3 && <RaitingAndReviews />} */}

        {currentTabIndex === 3 && !!reviews && <ReviewList reviews={reviews} />}
      </Container>
    </>
  );
};

export default Page;
