"use client";
import Image from "next/image";
import Link from "next/link";

import logo from "@/public/icons/logo.svg";
import logoMobile from "@/public/icons/logo_mobile.svg";

import DesktopNavigation from "./desktop-navigation";
import InfoOrMenuModal from "./info-or-menu-modal";
import { usePathname } from "next/navigation";
import { getNavLinksClass } from "@/utils/utils";
import Account from "./account";
import { Suspense } from "react";

export default function Header() {
  const pathname = usePathname();
  const showLogo = pathname === "/" || pathname === "/about";

  return (
    <nav
      className="absolute left-1/2 z-50 -translate-x-1/2"
      aria-label="Main Navigation"
    >
      <div
        className={`flex w-screen items-center justify-between pt-5 xl:w-[1280px] xl:pt-7 ${!showLogo ? "2xl:w-[1280px]" : "2xl:w-[1440px]"} 2xl:pt-14`}
      >
        {/* Logo */}
        <div className={`ml-5 ${showLogo ? "xl:ml-40" : ""}`}>
          <Link href="/" aria-label="Go to Home">
            <Image
              src={showLogo ? logo : logoMobile}
              alt="Company Logo"
              className="h-[65px] w-[65px] lg:h-[92px] lg:w-[92px]"
            />
          </Link>
        </div>

        <div className="flex">
          {/* Desktop Navigation */}
          <DesktopNavigation pathname={pathname} />

          {/* Action Icons */}
          <ul className="mr-8 flex items-center justify-between gap-5 text-lg text-white text-opacity-90 lg:gap-7 xl:mr-36 xl:text-xl 2xl:text-2xl">
            <li>
              <Suspense fallback={<div>Loading...</div>}>
                <Account />
              </Suspense>
            </li>
            <li>
              <Link href="/cart" aria-label="View Cart">
                <i
                  className={`${getNavLinksClass(pathname)} fa fa-shopping-bag`}
                  aria-hidden="true"
                ></i>
              </Link>
            </li>
            <li>
              {/* Menu Button && Open Info Modal || Mobile Menu */}
              <InfoOrMenuModal className={getNavLinksClass(pathname)} />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
