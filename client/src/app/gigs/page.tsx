"use client";
import { useSearch } from "@/api/gigs/queries/use-search.query";
import Gig from "@/components/gig-card";
import { Pagination } from "@/components/pagination";
import { useSearchParams, useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get pagination parameters from URL
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "2", 10);

  // Get other filter parameters from URL
  const categoryQuery = searchParams.get("category") || "";
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const searchKey = searchParams.get("searchKey") || "";
  const deliveryTime = searchParams.get("deliveryTime") || "";

  // Construct the base query string for filtering
  const baseQueryString = `category=${encodeURIComponent(
    categoryQuery
  )}&minPrice=${minPrice || ""}&maxPrice=${
    maxPrice || ""
  }&searchKey=${encodeURIComponent(
    searchKey
  )}&deliveryTime=${encodeURIComponent(deliveryTime || "")}`;

  // Pass limit and currentPage directly to useSearch
  const { isLoading, data, error } = useSearch({
    q: baseQueryString,
    page: currentPage,
    limit: limit,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handlePageChange = (page: number) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set("page", page.toString());
    currentParams.set("limit", limit.toString());
    router.push(`?${currentParams.toString()}`);
  };

  // Assuming totalCount comes from your API response,
  // for now, we'll keep a hardcoded value or derive it if possible from gigs.
  // In a real application, the API should return total count.
  // const totalCount = 200; // This should come from your API response

  console.log("safdasdfasdfa ", data);

  return (
    <div>
      <h1>Gigs</h1>
      <div className="flex justify-center flex-wrap gap-[10px]">
        {(data?.data || []).map((gig) => (
          <div key={gig.id}>
            <Gig gig={gig} /> {/* Pass the gig object to the Gig component */}
          </div>
        ))}
      </div>
      <div className="mt-[50px] mb-[50px]">
        <Pagination
          currentPage={currentPage}
          totalCount={data?.totalCount!} // Make sure this comes from your API response
          pageSize={limit}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Page;
