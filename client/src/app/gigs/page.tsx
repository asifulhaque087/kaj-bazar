// "use client";
// import { useSearch } from "@/api/gigs";
// import Gig from "@/components/gig-card";
// import { Pagination } from "@/components/pagination";
// import { useSearchParams, useRouter } from "next/navigation";

// const Page = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   // Get pagination parameters from URL
//   const currentPage = parseInt(searchParams.get("page") || "1", 10);
//   const limit = parseInt(searchParams.get("limit") || "2", 10);

//   // Get other filter parameters from URL
//   const categoryQuery = searchParams.get("category") || "";
//   const minPrice = searchParams.get("minPrice");
//   const maxPrice = searchParams.get("maxPrice");
//   const searchKey = searchParams.get("searchKey") || "";
//   const deliveryTime = searchParams.get("deliveryTime") || "";

//   // Construct the base query string for filtering
//   const baseQueryString = `category=${encodeURIComponent(
//     categoryQuery
//   )}&minPrice=${minPrice || ""}&maxPrice=${
//     maxPrice || ""
//   }&searchKey=${encodeURIComponent(
//     searchKey
//   )}&deliveryTime=${encodeURIComponent(deliveryTime || "")}`;

//   // Pass limit and currentPage directly to useSearch
//   const { isLoading, data, error } = useSearch({
//     q: baseQueryString,
//     page: currentPage,
//     limit: limit,
//   });

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;

//   const handlePageChange = (page: number) => {
//     const currentParams = new URLSearchParams(searchParams.toString());
//     currentParams.set("page", page.toString());
//     currentParams.set("limit", limit.toString());
//     router.push(`?${currentParams.toString()}`);
//   };

//   // Assuming totalCount comes from your API response,
//   // for now, we'll keep a hardcoded value or derive it if possible from gigs.
//   // In a real application, the API should return total count.
//   // const totalCount = 200; // This should come from your API response

//   console.log("safdasdfasdfa ", data);

//   return (
//     <div>
//       <h1>Gigs</h1>
//       <div className="flex justify-center flex-wrap gap-[10px]">
//         {(data?.data || []).map((gig) => (
//           <div key={gig.id}>
//             <Gig gig={gig} /> {/* Pass the gig object to the Gig component */}
//           </div>
//         ))}
//       </div>
//       <div className="mt-[50px] mb-[50px]">
//         <Pagination
//           currentPage={currentPage}
//           totalCount={data?.totalCount!} // Make sure this comes from your API response
//           pageSize={limit}
//           onPageChange={handlePageChange}
//         />
//       </div>
//     </div>
//   );
// };

// export default Page;

// ============================================ new ============================

"use client";
import { useSearch } from "@/api/gigs";
import Gig from "@/components/gig-card";
import { Pagination } from "@/components/pagination";
import { categories, expectedDelivery, gigsLimit } from "@/constants";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, ChangeEvent } from "react";

const Page = () => {
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
    // Add pagination params
    newParams.set("page", "1"); // Reset to page 1 on new search
    newParams.set("limit", limit.toString());

    // Add filter params, but only if they have a value
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
    router.push("?"); // Pushes to the base URL, effectively clearing all params
  };

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
    router.push(`?${currentParams.toString()}`);
  };

  // console.log("hello")

  return (
    <div className="flex">
      {/* Filter Section */}
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

      {/* Gig Display Section */}
      <div className="w-3/4 p-4">
        <h1 className="text-3xl font-bold mb-6">Gigs</h1>
        <div className="flex justify-center flex-wrap gap-[10px]">
          {(data?.data || []).map((gig) => (
            <div key={gig.id}>
              <Gig gig={gig} />
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

// ================================== try good one ===============

// "use client";

// import { useSearch } from "@/api/gigs";
// import Gig from "@/components/gig-card";
// import { Pagination } from "@/components/pagination";
// import { categories, expectedDelivery } from "@/constants";
// import { useSearchParams, useRouter } from "next/navigation";
// import { useMemo, useCallback } from "react";

// const DEFAULT_LIMIT = 20;

// const Filters = ({
//   filters,
//   onChange,
//   onApply,
//   onClear,
// }: {
//   filters: Record<string, string>;
//   onChange: (name: string, value: string) => void;
//   onApply: () => void;
//   onClear: () => void;
// }) => {
//   return (
//     <div className="w-1/4 p-4 border-r border-gray-200">
//       <h2 className="text-xl font-bold mb-4">Filters</h2>

//       {/* Search */}
//       <div className="mb-4">
//         <label htmlFor="searchKey" className="block text-sm font-medium">
//           Search Keyword
//         </label>
//         <input
//           id="searchKey"
//           name="searchKey"
//           value={filters.searchKey || ""}
//           onChange={(e) => onChange("searchKey", e.target.value)}
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
//         />
//       </div>

//       {/* Category */}
//       <div className="mb-4">
//         <label htmlFor="category" className="block text-sm font-medium">
//           Category
//         </label>
//         <select
//           id="category"
//           name="category"
//           value={filters.category || ""}
//           onChange={(e) => onChange("category", e.target.value)}
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
//         >
//           <option value="">All Categories</option>
//           {categories.map((category) => (
//             <option key={category} value={category}>
//               {category}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Delivery Time */}
//       <div className="mb-4">
//         <label htmlFor="deliveryTime" className="block text-sm font-medium">
//           Delivery Time
//         </label>
//         <select
//           id="deliveryTime"
//           name="deliveryTime"
//           value={filters.deliveryTime || ""}
//           onChange={(e) => onChange("deliveryTime", e.target.value)}
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
//         >
//           <option value="">Anytime</option>
//           {expectedDelivery.map((delivery) => (
//             <option key={delivery} value={delivery}>
//               {delivery}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Price */}
//       <div className="mb-4">
//         <label className="block text-sm font-medium">Price Range</label>
//         <div className="flex items-center gap-2 mt-1">
//           <input
//             type="number"
//             name="minPrice"
//             value={filters.minPrice || ""}
//             onChange={(e) => onChange("minPrice", e.target.value)}
//             placeholder="Min"
//             className="w-1/2 rounded-md border-gray-300 shadow-sm"
//           />
//           <span className="text-gray-500">-</span>
//           <input
//             type="number"
//             name="maxPrice"
//             value={filters.maxPrice || ""}
//             onChange={(e) => onChange("maxPrice", e.target.value)}
//             placeholder="Max"
//             className="w-1/2 rounded-md border-gray-300 shadow-sm"
//           />
//         </div>
//       </div>

//       <div className="flex gap-2">
//         <button
//           onClick={onApply}
//           className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//         >
//           Apply Filters
//         </button>
//         <button
//           onClick={onClear}
//           className="w-full px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
//         >
//           Clear
//         </button>
//       </div>
//     </div>
//   );
// };

// const Page = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   // Parse query params only once
//   const filters = useMemo(() => {
//     const params: Record<string, string> = {};
//     for (const [key, value] of searchParams.entries()) {
//       params[key] = value;
//     }
//     return {
//       category: params.category || "",
//       minPrice: params.minPrice || "",
//       maxPrice: params.maxPrice || "",
//       searchKey: params.searchKey || "",
//       deliveryTime: params.deliveryTime || "",
//     };
//   }, [searchParams]);

//   const currentPage = parseInt(searchParams.get("page") || "1", 10);
//   const limit = parseInt(searchParams.get("limit") || DEFAULT_LIMIT.toString(), 10);

//   // Handlers
//   const updateParam = useCallback(
//     (name: string, value: string) => {
//       const newParams = new URLSearchParams(searchParams.toString());
//       if (value) {
//         newParams.set(name, value);
//       } else {
//         newParams.delete(name);
//       }
//       // Reset page on filter change
//       newParams.set("page", "1");
//       router.replace(`?${newParams.toString()}`);
//     },
//     [router, searchParams]
//   );

//   const applyFilters = useCallback(() => {
//     // already handled live in updateParam
//   }, []);

//   const clearFilters = useCallback(() => {
//     router.replace("?");
//   }, [router]);

//   const handlePageChange = (page: number) => {
//     const newParams = new URLSearchParams(searchParams.toString());
//     newParams.set("page", page.toString());
//     router.replace(`?${newParams.toString()}`);
//   };

//   // Fetch data
//   const { isLoading, data, error } = useSearch({
//     q: searchParams.toString(),
//     page: currentPage,
//     limit,
//   });

//   return (
//     <div className="flex">
//       <Filters
//         filters={filters}
//         onChange={updateParam}
//         onApply={applyFilters}
//         onClear={clearFilters}
//       />

//       <div className="w-3/4 p-4">
//         <h1 className="text-3xl font-bold mb-6">Gigs</h1>

//         {isLoading && <div>Loading...</div>}
//         {error && <div className="text-red-500">Error: {error.message}</div>}

//         <div className="flex justify-center flex-wrap gap-[10px]">
//           {(data?.data || []).map((gig) => (
//             <Gig key={gig.id} gig={gig} />
//           ))}
//         </div>

//         <div className="mt-12 mb-12">
//           <Pagination
//             currentPage={currentPage}
//             totalCount={data?.totalCount || 0}
//             pageSize={limit}
//             onPageChange={handlePageChange}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Page;
