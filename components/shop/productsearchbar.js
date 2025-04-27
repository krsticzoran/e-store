"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { debounce } from "@/utils/utils";

export default function ProductSearchBar() {
  const router = useRouter();

  // State to track the current search query
  const [searchQuery, setSearchQuery] = useState("");

  // Create a debounced version of the search function using useRef
  // This ensures the same debounced function is used across re-renders
  const updateSearchParam = useRef(
    debounce((query) => {
      let trimed = query.trim();
      if (trimed) {
        // If query exists, update URL with search parameter
        router.replace(`/shop/?page=1&search=${encodeURIComponent(trimed)}`, {
          scroll: false,
        });
        router.refresh();
      } else {
        // If query is empty, return to base shop page
        router.replace("/shop/", { scroll: false });
        router.refresh();
      }
    }, 500), // Debounce delay of 500ms
  );

  // Effect to trigger the debounced search when query changes
  useEffect(() => {
    updateSearchParam.current(searchQuery);
  }, [searchQuery]);

  return (
    <div className="border border-[#CCC] py-3" role="search">
      {/* Search icon - decorative only (hidden from screen readers) */}
      <i
        className="fa-solid fa-magnifying-glass mx-2 text-primary text-opacity-75"
        aria-hidden="true"
      ></i>

      {/* Search input field */}
      <input
        type="text"
        id="search"
        name="search"
        aria-label="Product search bar"
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search product..."
        value={searchQuery || ""}
        className="placeholder:text-sm focus:outline-none"
        maxLength={20}
      />
    </div>
  );
}
