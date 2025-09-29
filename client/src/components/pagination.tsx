"use client";

import {
  DOTS,
  PaginationItem,
  usePagination,
} from "@/hooks/use-pagination.hook";
import React from "react";

interface IPagination {
  onPageChange: (page: number) => void;
  paginationRange: PaginationItem[] | undefined;
  currentPage: number;
}

export const Pagination = (props: IPagination) => {
  const { onPageChange, currentPage, paginationRange } = props;

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
            className={`box-border flex items-center justify-center  rounded-[4px] cursor-pointer  text-[13px] leading-[20px] tracking-[1px] hover:bg-[#616BA4] hover:text-[#FEFEFF] ${
              pageNumber === currentPage
                ? "text-[18px] font-[600] leading-[27px] h-[35px] w-[35px] bg-[#9FBB89] text-[#FEFEFF]"
                : "h-[25px] w-[25px] font-[600] text-[#FEFEFF] bg-[#616BA4]"
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
