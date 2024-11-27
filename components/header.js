"use client";
import React from "react";
import Link from "next/link";

const ContactForm = () => {
  return (
    <div>
      <Link href="/">Home</Link>
      <Link href="/cart">Cart</Link>
      <Link href="/contact">Contact</Link>
      <Link href="/checkout">Checkout</Link>
      <Link href="/account?mode=login">My Account</Link>
    </div>
  );
};

export default ContactForm;
