"use client";
import { ChangeEvent } from "react";
import { categories, expectedDelivery } from "@/constants";

// Define a type for the filter state to ensure type safety
interface Filters {
  category: string;
  minPrice: string;
  maxPrice: string;
  searchKey: string;
  deliveryTime: string;
}

// Define the props interface for the GigFilters component
interface GigFiltersProps {
  filters: Filters;
  handleFilterChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  applyFilters: () => void;
  clearFilters: () => void;
}

const GigFilters = ({
  filters,
  handleFilterChange,
  applyFilters,
  clearFilters,
}: GigFiltersProps) => {
  return (
    <div className="flex flex-wrap gap-3 items-center justify-center py-[10px]">
      {/* Search */}
      <input
        type="text"
        id="searchKey"
        name="searchKey"
        value={filters.searchKey}
        placeholder="Search"
        onChange={handleFilterChange}
        className="px-4 py-2 grow rounded-md border border-gray-300 bg-white text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
      />

      {/* Price Range */}
      <div className="flex grow bg-white items-center border border-gray-300 rounded-md overflow-hidden">
        <input
          type="number"
          name="minPrice"
          value={filters.minPrice}
          onChange={handleFilterChange}
          placeholder="Min"
          className="w-20 px-3 py-2 text-sm border-r border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400"
        />
        <input
          type="number"
          name="maxPrice"
          value={filters.maxPrice}
          onChange={handleFilterChange}
          placeholder="Max"
          className="w-20 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
        />
      </div>

      {/* Category */}
      <div className="relative grow">
        <select
          id="category"
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          className="pr-10 px-4 py-2 rounded-md border border-gray-300 bg-white text-sm appearance-none w-full focus:outline-none focus:ring-1 focus:ring-gray-400 cursor-pointer"
        >
          <option value="">Category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-700">
          <svg
            className="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {/* Delivery Time */}
      <div className="relative grow">
        <select
          id="deliveryTime"
          name="deliveryTime"
          value={filters.deliveryTime}
          onChange={handleFilterChange}
          className="pr-10 px-4 py-2 rounded-md border border-gray-300 bg-white text-sm appearance-none w-full focus:outline-none focus:ring-1 focus:ring-gray-400 cursor-pointer"
        >
          <option value="">Delivery Time</option>
          {expectedDelivery.map((delivery) => (
            <option key={delivery} value={delivery}>
              {delivery}
            </option>
          ))}
        </select>

        {/* Custom dropdown icon */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-700">
          <svg
            className="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {/* Actions */}
      <button
        onClick={applyFilters}
        className="px-4 py-2 rounded-md border border-gray-300 text-sm font-medium bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-1 focus:ring-gray-400 text-white cursor-pointer"
      >
        Apply
      </button>
      <button
        onClick={clearFilters}
        className="px-4 py-2 rounded-md border border-gray-300 text-sm font-medium bg-red-500 hover:bg-red-600 text-white focus:outline-none focus:ring-1 focus:ring-gray-400 cursor-pointer"
      >
        Clear
      </button>
    </div>
  );
};

export default GigFilters;
