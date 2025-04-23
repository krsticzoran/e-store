"use client";

import { useSearchParams, useRouter } from "next/navigation";

export default function Pagination({ totalItems, itemsPerPage }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = Number(searchParams.get("page")) || 1;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleClick = (num) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("page", num);
    router.push(`/shop/?${newParams.toString()}`, { scroll: false });
    router.refresh();
  };

  return (
    <div className="col-span-3 flex gap-4">
      <button
        disabled={page <= 1}
        onClick={() => handleClick(page - 1)}
        aria-label="previous page"
      >
        Previous
      </button>

      <button
        disabled={page >= totalPages}
        onClick={() => handleClick(page + 1)}
        aria-label="next page"
      >
        Next
      </button>
    </div>
  );
}
