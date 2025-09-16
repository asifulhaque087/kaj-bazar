"use client";
import { useSearch } from "@/api/gigs";
import Gig from "@/components/gig-card";
import GigFilters from "@/components/gig-filters";
import { Pagination } from "@/components/pagination";
import useGigFilters from "@/hooks/use-gigs-flter.hook";

const Page = () => {
  const {
    filters,
    handleFilterChange,
    applyFilters,
    clearFilters,
    handlePageChange,
    currentPage,
    limit,
    baseQueryString,
  } = useGigFilters();

  const { isLoading, data, error } = useSearch({
    q: baseQueryString,
    page: currentPage,
    limit: limit,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="">
      {/* Filter Section */}
      <div className="">
        <GigFilters
          filters={filters}
          handleFilterChange={handleFilterChange}
          applyFilters={applyFilters}
          clearFilters={clearFilters}
        />
      </div>
      {/* Gig Display Section */}
      <div className="pt-[20px]">
        {/* <h1 className="text-3xl font-bold mb-6">Gigs</h1> */}
        <div className="flex gap-[10px] flex-wrap items-center justify-center">
          {(data?.data || []).map((gig) => (
            <div key={gig.id} className="grow basis-[262px]">
              <Gig gig={gig} fluid />
            </div>
          ))}
        </div>
        <div className="mt-[50px] mb-[50px]">
          <Pagination
            currentPage={currentPage}
            totalCount={data?.totalCount || 0}
            pageSize={limit}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};
export default Page;
