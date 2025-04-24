"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { sortingOptions as options } from "@/data/shop";
import Image from "next/image";
import arrowDown from "@/public/icons/shop/arrow-down.svg";

export default function Dropdown({ basePath }) {
  const router = useRouter();
  const params = useSearchParams();

  // State to track whether the dropdown is open
  const [isOpen, setIsOpen] = useState(false);
  // State to store the selected sorting
  const [selectedValue, setSelectedValue] = useState("default");

  // Function to handle selection of a sorting option
  const handleSelect = (value) => {
    const newParams = new URLSearchParams(params.toString()); // Create a copy of the current query parameters

    newParams.set("sort", value); // Update the 'sort' query parameter with the selected value
    newParams.set("page", "1"); // Reset the page to 1 whenever a new sort option is selected

    setSelectedValue(value); // Update the selected value in the state
    setIsOpen(false); // Close the dropdown after selection

    // Navigate to the new URL with the updated search params (sort and page)
    router.push(`${basePath}?${newParams.toString()}`, { scroll: false });
    router.refresh();
  };

  return (
    <div // Open & close the dropdown on mouse hover & click
      className="relative inline-block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onClick={() => setIsOpen(!isOpen)}
    >
      <button
        className="flex w-48 items-center justify-between rounded border bg-[#E8E8EB] bg-white px-3 py-[6px] text-sm"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {/* Display the label of the selected sorting option */}
        {options.find((opt) => opt.value === selectedValue)?.label}

        {/* Arrow icon indicating the dropdown */}
        <span className="ml-2">
          <Image src={arrowDown} width={12} height={12} alt="arrow down icon" />
        </span>
      </button>

      {/* The dropdown list, shown when 'isOpen' is true */}
      {isOpen && (
        <ul
          className="absolute z-10 w-full rounded border bg-white pt-1 shadow-lg"
          role="listbox"
        >
          {/* Map over the sorting options and display them as list items */}
          {options.map((option) => (
            <li
              key={option.value}
              className={`cursor-pointer px-3 py-[6px] hover:bg-gray-100 ${
                selectedValue === option.value ? "bg-blue-50" : ""
              }`}
              onClick={() => handleSelect(option.value)}
              role="option"
              aria-selected={selectedValue === option.value}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
