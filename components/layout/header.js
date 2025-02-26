"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";
import Link from "next/link";
import logo from "@/public/icons/logo.svg";

const ContactForm = () => {
  const pathname = usePathname();
  return (
    <nav
      className="absolute left-1/2 z-50 -translate-x-1/2 transform"
      aria-label="Main Navigation"
    >
      <div className="flex w-screen items-center justify-between pt-5 xl:w-[1280px] xl:pt-7 2xl:w-[1440px] 2xl:pt-14">
        {/* Logo */}
        <div className="ml-8 xl:ml-40">
          <Link href="/" aria-label="Go to Home">
            <Image
              src={logo}
              alt="Company Logo"
              className="w-[70%] lg:w-[100%]"
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex">
          <ul className="mr-32 hidden items-end gap-7 text-base font-semibold uppercase tracking-widest text-white xl:flex 2xl:text-lg">
            <li className={pathname == "/" ? "text-secondary" : ""}>
              <Link href="/" className="hover:text-secondary">
                Home
              </Link>
            </li>
            <li className={pathname == "/shop" ? "text-secondary" : ""}>
              <Link href="/shop" className="hover:text-secondary">
                Shop
              </Link>
            </li>
            <li className={pathname == "/about-us" ? "text-secondary" : ""}>
              <Link href="/about-us" className="hover:text-secondary">
                About us
              </Link>
            </li>
            <li className={pathname == "/contact" ? "text-secondary" : ""}>
              <Link href="/contact" className="hover:text-secondary">
                Contact
              </Link>
            </li>
          </ul>

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
              <button aria-label="Toggle Menu">
                <i className="fas fa-bars" aria-hidden="true"></i>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default ContactForm;
