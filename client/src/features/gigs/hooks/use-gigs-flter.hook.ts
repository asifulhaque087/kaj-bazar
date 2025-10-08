// useSearchFilters.ts
"use client";
import { useState, useEffect, ChangeEvent } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { gigsLimit } from "@/constants";

const useGigFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get filter and pagination parameters from URL
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || gigsLimit, 10);
  const categoryQuery = searchParams.get("category") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const searchKey = searchParams.get("searchKey") || "";
  const deliveryTime = searchParams.get("deliveryTime") || "";

  // State to manage form inputs
  const [filters, setFilters] = useState({
    category: categoryQuery,
    minPrice: minPrice,
    maxPrice: maxPrice,
    searchKey: searchKey,
    deliveryTime: deliveryTime,
  });

  // Keep local state in sync with URL params
  useEffect(() => {
    setFilters({
      category: categoryQuery,
      minPrice: minPrice,
      maxPrice: maxPrice,
      searchKey: searchKey,
      deliveryTime: deliveryTime,
    });
  }, [categoryQuery, minPrice, maxPrice, searchKey, deliveryTime]);

  const handleFilterChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const applyFilters = () => {
    const newParams = new URLSearchParams();
    newParams.set("page", "1");
    newParams.set("limit", limit.toString());

    if (filters.category) {
      newParams.set("category", filters.category);
    }
    if (filters.minPrice) {
      newParams.set("minPrice", filters.minPrice);
    }
    if (filters.maxPrice) {
      newParams.set("maxPrice", filters.maxPrice);
    }
    if (filters.searchKey) {
      newParams.set("searchKey", filters.searchKey);
    }
    if (filters.deliveryTime) {
      newParams.set("deliveryTime", filters.deliveryTime);
    }

    router.push(`?${newParams.toString()}`);
  };

  const clearFilters = () => {
    router.push("?");
  };

  const handlePageChange = (page: number) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set("page", page.toString());
    router.push(`?${currentParams.toString()}`);
  };

  const baseQueryString = `category=${encodeURIComponent(
    categoryQuery
  )}&minPrice=${minPrice || ""}&maxPrice=${
    maxPrice || ""
  }&searchKey=${encodeURIComponent(
    searchKey
  )}&deliveryTime=${encodeURIComponent(deliveryTime || "")}`;

  return {
    filters,
    handleFilterChange,
    applyFilters,
    clearFilters,
    handlePageChange,
    currentPage,
    limit,
    baseQueryString,
  };
};

export default useGigFilters;
