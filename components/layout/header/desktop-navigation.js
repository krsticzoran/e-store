import { pages } from "@/data/headerData";
import Link from "next/link";
import { getNavLinksClass } from "@/utils/utils";

export default function DesktopNavigation({ pathname }) {
  return (
    <ul
      className={`${pathname === "/cart" || pathname.startsWith("/product/") ? "mr-52" : "mr-32"} hidden items-end gap-7 text-base font-semibold uppercase tracking-widest text-white xl:flex 2xl:text-lg`}
    >
      {pages.map((page) => (
        <li
          key={page}
          className={
            pathname == `/${page}`
              ? "text-secondary"
              : getNavLinksClass(pathname)
          }
        >
          <Link href={`/${page}`} className="hover:text-secondary">
            {page === "" ? "home" : page === "about" ? "about us" : page}
          </Link>
        </li>
      ))}
    </ul>
  );
}
