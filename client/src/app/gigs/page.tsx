"use client";

import { Suspense } from "react";
import Container from "@/components/container";
import { Pagination } from "@/components/pagination";
import GigCard from "@/features/gig/components/gig-card";
import GigFilters from "@/features/gig/components/gig-filters";
import useGigFilters from "@/features/gig/hooks/use-gigs-flter.hook";
import { useSearch } from "@/features/gig/queries/use-gigs.query";
import { usePagination } from "@/hooks/use-pagination.hook";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading gigs...</div>}>
      <GigsPageContent />
    </Suspense>
  );
}

function GigsPageContent() {
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

  // if (isLoading) return <div>Loading gigs...</div>;
  if (isLoading) return null;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      {/* Filter Section */}
      <Container className="pt-[72px]">
        <GigFilters
          filters={filters}
          handleFilterChange={handleFilterChange}
          applyFilters={applyFilters}
          clearFilters={clearFilters}
        />
      </Container>

      <Container className="pt-[72px]">
        <div className="flex gap-[10px] flex-wrap items-center justify-center">
          {(data?.data || []).map((gig) => (
            <div key={gig.id} className="grow basis-[262px]">
              <GigCard gig={gig} fluid />
            </div>
          ))}
        </div>
      </Container>

      <Container className="py-[72px]">
        <Pagination
          paginationRange={paginationRange}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </Container>
    </>
  );
}
