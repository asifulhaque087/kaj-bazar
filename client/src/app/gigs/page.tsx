"use client";
import { useSearch } from "@/api/gigs/queries/use-search.query";
import Gig from "@/components/Gig";
import { useSearchParams } from "next/navigation";

const page = () => {
  const searchParams = useSearchParams();
  const categoryQuery = searchParams.get("category") || "";
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const searchKey = searchParams.get("searchKey") || "";
  const deliveryTime = searchParams.get("deliveryTime") || "";

  const queryString = `category=${encodeURIComponent(
    categoryQuery
  )}&minPrice=${minPrice}&maxPrice=${maxPrice}&searchKey=${encodeURIComponent(
    searchKey
  )}&deliveryTime=${encodeURIComponent(deliveryTime)}`;

  // console.log("query issis sd ", queryString);

  // console.log("cateasldsdfa  ", categoryQuery);
  // console.log("minPrice is ", minPrice);

  const { isLoading, data: gigs, error } = useSearch({ q: queryString });

  if (isLoading) return <div>Loading...</div>;

  console.log("gigs are ", gigs);

  return (
    <div>
      <h1>Gigs</h1>
      <div className="flex justify-center flex-wrap gap-[10px]">
        {gigs?.map((gig) => (
          <div key={gig.id}>
            <Gig gig="" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;

// const categoryQuery = decodeURIComponent(searchParams.get("category") || "");
