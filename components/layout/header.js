"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";
import Link from "next/link";
import logo from "@/public/logo/logo.svg";

const ContactForm = () => {
  const pathname = usePathname();
  return (
    <nav className="absolute left-1/2 z-50 -translate-x-1/2 transform">
      <div className="flex w-[1280px] items-center justify-between pt-7">
        <div className="ml-40">
          <Image src={logo} alt="logo" />
        </div>
        <div className="flex">
          <ul className="mr-32 flex gap-7 font-semibold uppercase tracking-widest text-white">
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

          <ul className="mr-36 flex items-center justify-between gap-7 text-[22px] text-white text-opacity-90">
            <li>
              <Link href="/my-account">
                <i className="fa fa-user"></i>
              </Link>
            </li>
            <li>
              <Link href="/cart">
                <i className="fa fa-shopping-bag"></i>
              </Link>
            </li>
            <li>
              <button>
                <i className="fas fa-bars"></i>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default ContactForm;
