"use client";
import { useSearch } from "@/api/gigs";
import Container from "@/components/container";
import Gig from "@/components/gig-card";
import GigFilters from "@/components/gig-filters";
import { Pagination } from "@/components/pagination";
import useGigFilters from "@/hooks/use-gigs-flter.hook";
import { usePagination } from "@/hooks/use-pagination.hook";

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

  const paginationRange = usePagination({
    currentPage,
    totalCount: data?.totalCount || 0,
    siblingCount: 1,
    pageSize: limit,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      {/* Filter Section */}
      <Container className="mt-[72px]">
        <GigFilters
          filters={filters}
          handleFilterChange={handleFilterChange}
          applyFilters={applyFilters}
          clearFilters={clearFilters}
        />
      </Container>

      <Container className="mt-[72px]">
        <div className="flex gap-[10px] flex-wrap items-center justify-center">
          {(data?.data || []).map((gig) => (
            <div key={gig.id} className="grow basis-[262px]">
              <Gig gig={gig} fluid />
            </div>
          ))}
        </div>
      </Container>

      <Container className="mt-[72px]">
        <Pagination
          paginationRange={paginationRange}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </Container>
    </>
  );
};
export default Page;
