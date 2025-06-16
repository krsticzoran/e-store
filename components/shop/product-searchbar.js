"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { debounce } from "@/utils/utils";

export default function ProductSearchBar() {
  const router = useRouter();

  // State to track the current search query
  const [searchQuery, setSearchQuery] = useState("");
  const lastKeyRef = useRef(); // Track last pressed key

  // Create a debounced version of the search function using useRef
  // This ensures the same debounced function is used across re-renders
  const updateSearchParam = useRef(
    debounce((query) => {
      let trimed = query.trim();

      // Check if backspace was pressed and query is now empty
      const wasBackspace = lastKeyRef.current === "Backspace" && query === "";

      if (trimed) {
        // If query exists, update URL with search parameter
        router.replace(`/shop/?page=1&search=${encodeURIComponent(trimed)}`, {
          scroll: false,
        });
        router.refresh();
      } else if (wasBackspace) {
        // Only clear if backspace resulted in empty query
        router.replace("/shop/", { scroll: false });
        router.refresh();
      }
    }, 500), // Debounce delay of 500ms
  );

  const handleKeyDown = (e) => {
    lastKeyRef.current = e.key; // Store the last key pressed
  };

  // Effect to trigger the debounced search when query changes
  useEffect(() => {
    updateSearchParam.current(searchQuery);
  }, [searchQuery]);

  return (
    <div className="mb-10 border border-[#CCC] py-3" role="search">
      {/* Search icon - decorative only (hidden from screen readers) */}
      <i
        className="fa-solid fa-magnifying-glass mx-2 text-primary text-opacity-75"
        aria-hidden="true"
        data-testid="search-icon"
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
        onKeyDown={handleKeyDown} // Track key presses
      />
    </div>
  );
}
