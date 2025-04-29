import { pages } from "@/data/headerData";
import Link from "next/link";
import { getNavLinksClass } from "@/utils/utils";

export default function DesktopNavigation({ pathname }) {
  return (
    // Navigation container with conditional right margin
    <ul
      className={`${pathname === "/" ? "mr-32" : "mr-52"} hidden items-end gap-7 text-base font-semibold uppercase tracking-widest text-white xl:flex 2xl:text-lg`}
    >
      {pages.map((page) => {
        // Determine if current page is the shop page
        const isShopPage = page === "shop";

        // Check active state:
        // - For shop page: match any route starting with "/shop"
        // - For other pages: exact path match
        const isActive = isShopPage
          ? pathname.startsWith("/shop")
          : pathname === `/${page}`;

        return (
          <li
            key={page}
            // Apply 'text-secondary' if active, otherwise use default class
            className={isActive ? "text-secondary" : getNavLinksClass(pathname)}
          >
            <Link href={`/${page}`} className="hover:text-secondary">
              {page === "" ? "home" : page === "about" ? "about us" : page}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
