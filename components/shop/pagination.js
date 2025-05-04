"use client";

import { useSearchParams, useRouter } from "next/navigation";

export default function Pagination({ totalItems, itemsPerPage, basePath }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get current page from URL query params or default to 1
  const page = Number(searchParams.get("page")) || 1;
  // Calculate total number of pages based on total items and items per page
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Handle click on any page button
  const handleClick = (num) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("page", num);

    router.push(`${basePath}?${newParams.toString()}`, { scroll: false });
    router.refresh();
  };

  return (
    <>
      {/* Only show pagination if there is more than one page */}
      {totalPages > 1 && (
        <div className="mt-10 flex w-full justify-center gap-4 text-primary">
          {/* Previous page button */}
          <button
            className="h-10 w-10 bg-[rgba(46,82,74,0.1)]"
            disabled={page <= 1}
            onClick={() => handleClick(page - 1)}
            aria-label="previous page"
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>

          {/* Page numbers list */}
          <ul className="flex">
            {Array.from({ length: totalPages }).map((_, i) => (
              <li
                key={i}
                onClick={() => handleClick(i + 1)}
                className={`mx-[6px] h-10 w-10 ${i + 1 === page ? "bg-primary text-white" : "bg-[rgba(46,82,74,0.1)]"} flex cursor-pointer items-center justify-center font-bold`}
                role="button"
                aria-label={`Go to page ${i + 1}`}
                aria-current={i + 1 === page ? "page" : undefined}
              >
                {i + 1}
              </li>
            ))}
          </ul>

          {/* Next page button */}
          <button
            className="h-10 w-10 bg-[rgba(46,82,74,0.1)]"
            disabled={page >= totalPages}
            onClick={() => handleClick(page + 1)}
            aria-label="next page"
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      )}
    </>
  );
}
