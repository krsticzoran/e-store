"use client";
import Image from "next/image";
import Link from "next/link";

import logo from "@/public/icons/logo.svg";
import logoMobile from "@/public/icons/logo_mobile.svg";

import DesktopNavigation from "./desktop-navigation";
import InfoOrMenuModal from "./info-or-menu-modal";
import { usePathname } from "next/navigation";
import { getNavLinksClass } from "@/utils/utils";

export default function Header() {
  const pathName = usePathname();

  return (
    <nav
      className="absolute left-1/2 z-50 -translate-x-1/2"
      aria-label="Main Navigation"
    >
      <div className="flex w-screen items-center justify-between pt-5 xl:w-[1280px] xl:pt-7 2xl:w-[1440px] 2xl:pt-14">
        {/* Logo */}
        <div className="ml-5 xl:ml-40">
          <Link href="/" aria-label="Go to Home">
            <Image
              src={pathName === "/cart" ? logoMobile : logo}
              alt="Company Logo"
              className="h-[65px] w-[65px] lg:h-[92px] lg:w-[92px]"
            />
          </Link>
        </div>

        <div className="flex">
          {/* Desktop Navigation */}
          <DesktopNavigation />

          {/* Action Icons */}
          <ul className="mr-8 flex items-center justify-between gap-5 text-lg text-white text-opacity-90 lg:gap-7 xl:mr-36 xl:text-xl 2xl:text-2xl">
            <li>
              <Link href="/account" aria-label="Go to My Account">
                <i
                  className={`${getNavLinksClass(pathName)} fa fa-user`}
                  aria-hidden="true"
                ></i>
              </Link>
            </li>
            <li>
              <Link href="/cart" aria-label="View Cart">
                <i
                  className={`${getNavLinksClass(pathName)} fa fa-shopping-bag`}
                  aria-hidden="true"
                ></i>
              </Link>
            </li>
            <li>
              {/* Menu Button && Open Info Modal || Mobile Menu */}
              <InfoOrMenuModal className={getNavLinksClass(pathName)} />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
