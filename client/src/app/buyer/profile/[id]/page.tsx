"use client";
import Tabs from "@/features/seller/components/tabs";
import Container from "@/components/container";
import ReviewCard from "@/features/review/components/review-card";
import { Card } from "@/components/ui/card";
import { buyerProfileTabs } from "@/constants";
import useTabs from "@/hooks/useTabs";
import { useParams } from "next/navigation";
import { useBuyerQuery } from "@/features/buyer/queries/use-buyer.query";
import { DataTable } from "@/components/data-table";
import { Order } from "@/features/order/schemas/order.schema";
import { createColumnHelper } from "@tanstack/react-table";
import {
  OrderStatus,
  useBuyerOrdersQuery,
} from "@/features/order/queries/use-buyer-orders.query";
import { format, formatDistanceToNowStrict, parseISO } from "date-fns";
import Image from "next/image";

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

      return dateValue
        ? formatDistanceToNowStrict(parseISO(dateValue), { addSuffix: true })
        : "-";
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

const BuyerProfile = () => {
  //   ** Params
  const params = useParams<{ id: string }>();

  // ** Queries
  const { data: buyer, isLoading } = useBuyerQuery({
    id: params.id,
  });

  const { currentTabIndex, handleTabIndex, tabs } = useTabs({
    tabs: buyerProfileTabs,
  });

  const orderStatus = [
    "status=progress",
    "status=complete",
    "status=incomplete",
  ];

  const { data: orders } = useBuyerOrdersQuery({
    buyerId: params.id,
    // q:"status=complete",
    // q:"status=progress",
    q: orderStatus[currentTabIndex] as OrderStatus,
  });

  if (isLoading) return null;

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
        {/* <OrderTable /> */}
        {/* <OrderTable columns={} tableData={} /> */}
        {/* <DataTable<Order, any> columns={columns} data={[]} /> */}
        <DataTable<Order, any> columns={columns} data={orders ?? []} />
      </Container>
    </>
  );
};

export default BuyerProfile;
