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
    <div className="w-1/4 p-4 border-r border-gray-200">
      <h2 className="text-xl font-bold mb-4">Filters</h2>
      <div className="mb-4">
        <label
          htmlFor="searchKey"
          className="block text-sm font-medium text-gray-700"
        >
          Search Keyword
        </label>
        <input
          type="text"
          id="searchKey"
          name="searchKey"
          value={filters.searchKey}
          onChange={handleFilterChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700"
        >
          Category
        </label>
        <select
          id="category"
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label
          htmlFor="deliveryTime"
          className="block text-sm font-medium text-gray-700"
        >
          Delivery Time
        </label>
        <select
          id="deliveryTime"
          name="deliveryTime"
          value={filters.deliveryTime}
          onChange={handleFilterChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="">Anytime</option>
          {expectedDelivery.map((delivery) => (
            <option key={delivery} value={delivery}>
              {delivery}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Price Range
        </label>
        <div className="flex items-center gap-2 mt-1">
          <input
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleFilterChange}
            placeholder="Min"
            className="w-1/2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          <span className="text-gray-500">-</span>
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleFilterChange}
            placeholder="Max"
            className="w-1/2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={applyFilters}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        >
          Apply Filters
        </button>
        <button
          onClick={clearFilters}
          className="w-full px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-200 focus:ring-opacity-50"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default GigFilters;
