import Link from "next/link";

export default function Breadcrumb({ product }) {
  return (
    <nav aria-label="breadcrumb ">
      <ol className="flex text-xs capitalize text-primary sm:text-base">
        {/* Home */}
        <li>
          <Link href="/" className="opacity-60 duration-500 hover:opacity-100">
            Home
          </Link>
        </li>
        <span className="px-1 opacity-60">/</span>
        {/* Category */}
        <li>
          <Link
            href={`/shop/${product.categories[0].slug || product.categories[0].name}`}
            className="opacity-60 duration-500 hover:opacity-100"
          >
            {product.categories[0].name}
          </Link>
        </li>
        <span className="px-1 opacity-60">/</span>
        {/* Current Page (non-clickable) */}
        <li>
          <span>{product.name}</span>
        </li>
      </ol>
    </nav>
  );
}
