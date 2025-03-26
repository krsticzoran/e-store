import Image from "next/image";
import Link from "next/link";

import logo from "@/public/icons/logo.svg";
import DesktopNavigation from "./desktop-navigation";
import InfoOrMenuModal from "./info-or-menu-modal";

export default function Header() {
  return (
    <nav
      className="absolute left-1/2 z-50 -translate-x-1/2 transform"
      aria-label="Main Navigation"
    >
      <div className="flex w-screen items-center justify-between pt-5 xl:w-[1280px] xl:pt-7 2xl:w-[1440px] 2xl:pt-14">
        {/* Logo */}
        <div className="ml-5 xl:ml-40">
          <Link href="/" aria-label="Go to Home">
            <Image
              src={logo}
              alt="Company Logo"
              className="w-[70%] lg:w-[100%]"
            />
          </Link>
        </div>

        <div className="flex">
          {/* Desktop Navigation */}
          <DesktopNavigation />

          {/* Action Icons */}
          <ul className="mr-8 flex items-center justify-between gap-5 text-lg text-white text-opacity-90 lg:gap-7 xl:mr-36 xl:text-xl 2xl:text-2xl">
            <li>
              <Link href="/my-account" aria-label="Go to My Account">
                <i className="fa fa-user" aria-hidden="true"></i>
              </Link>
            </li>
            <li>
              <Link href="/cart" aria-label="View Cart">
                <i className="fa fa-shopping-bag" aria-hidden="true"></i>
              </Link>
            </li>
            <li>
              {/* Menu Button && Open Info Modal || Mobile Menu */}
              <InfoOrMenuModal />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
