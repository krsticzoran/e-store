import Link from "next/link";
// Reusable list for product taxonomies (categories/tags)
export default function TaxonomyList({ items, label }) {
  return (
    <p className="mb-1.5">
      {/* Section label (e.g. "Categories", "Tags") */}
      <span className="font-bold">{label}: </span>

      {/* Dynamically links each item to /shop/[taxonomy] */}
      {items?.map((item, index, array) => (
        <Link
          href={`/shop/${item.slug || item.name}`}
          key={item.id || index}
          className="capitalize duration-500 hover:text-secondary"
        >
          {item.name}
          {index < array.length - 1 && ","}
          {index < array.length - 1 && " "}
        </Link>
      ))}
    </p>
  );
}
