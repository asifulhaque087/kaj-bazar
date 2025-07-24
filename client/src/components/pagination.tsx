"use client";

import { DOTS, usePagination } from "@/hooks/use-pagination.hook";
import React from "react";

interface IPagination {
  onPageChange: (page: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
}

export const Pagination = (props: IPagination) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange!.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange![paginationRange!.length - 1];
  return (
    <ul className={`flex items-center justify-center gap-[11px] list-none`}>
      <li
        className={`box-border flex items-center justify-center cursor-pointer  ${
          currentPage === 1 ? "pointer-events-none" : null
        }`}
        onClick={onPrevious}
        data-testid="pagination-prev-button"
      >
        <div
          className={`border-[#212121]  border-t border-r inline-block h-2 relative w-2 rotate-[-135deg] ${
            currentPage === 1
              ? "border-r-[#0000006e] border-t-[#0000006e]"
              : null
          }`}
        />
      </li>
      {paginationRange!.map((pageNumber, i) => {
        if (pageNumber === DOTS) {
          return (
            <li
              key={i}
              className={`box-border flex items-center justify-center text-[#212121] text-[13px] font-[600] leading-[20px] tracking-[1px] hover:cursor-default `}
            >
              {/* &#8230; */}
              ...
            </li>
          );
        }

        return (
          <li
            key={i}
            className={`box-border flex items-center justify-center  rounded-[4px] cursor-pointer  text-[13px] leading-[20px] tracking-[1px] hover:bg-[#317AF5] hover:text-white ${
              pageNumber === currentPage
                ? "text-[18px] font-[600] leading-[27px] h-[35px] w-[35px] bg-[#317AF5] text-white"
                : "h-[25px] w-[25px] font-[600] text-white bg-[#317AF5]"
            }`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={`box-border flex items-center justify-center cursor-pointer ${
          currentPage === lastPage ? "pointer-events-none" : null
        }`}
        data-testid="pagination-next-button"
        onClick={onNext}
      >
        <div
          className={`border-[#212121]  border-t border-r inline-block h-2 relative w-2 rotate-[45deg] ${
            currentPage === lastPage
              ? "border-r-[#0000006e] border-t-[#0000006e]"
              : null
          }`}
        />
      </li>
    </ul>
  );
};
