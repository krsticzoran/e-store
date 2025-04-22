"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Dropdown() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("default");

  const options = [
    { value: "default", label: "Default Sorting" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "date-newest", label: "Newest Arrivals" },
    { value: "date-oldest", label: "Oldest Arrivals" },
  ];

  const handleSelect = (value) => {
    setSelectedValue(value);
    setIsOpen(false);
    router.push(`/shop/?page=1&sort=${value}`, { scroll: false });
    router.refresh();
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className="flex w-48 items-center justify-between rounded border bg-[#E8E8EB] bg-white px-3 py-[6px] text-sm"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {options.find((opt) => opt.value === selectedValue)?.label}
        <span className="ml-2">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path d="M6 9L12 15L18 9" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
      </button>

      {isOpen && (
        <ul
          className="absolute z-10 w-full rounded border bg-white pt-1 shadow-lg"
          role="listbox"
        >
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
