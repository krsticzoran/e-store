"use client";
import { useState } from "react";
import ModalWrapper from "@/components/ui/modal-wrapper";
import close from "@/public/icons/cart/close.svg";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/icons/logo.svg";

export default function InfoOrMenuModal() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Menu Button */}
      <button aria-label="Toggle Menu" onClick={toggleModal}>
        <i className="fas fa-bars" aria-hidden="true"></i>
      </button>

      <ModalWrapper
        isOpen={isOpen}
        className="fixed bottom-0 right-0 z-50 flex h-full w-full"
      >
        {/* Backdrop */}
        <div
          className="h-full flex-grow bg-black opacity-50"
          onClick={toggleModal}
        ></div>

        {/* Panel */}
        <div className="z-50 flex h-full w-full flex-col bg-white p-5 font-urbanist text-primary text-white opacity-100 sm:w-[500px] xl:bg-[#132420]">
          <div className="flex justify-end">
            <button onClick={toggleModal} aria-label="Close modal">
              <Image src={close} width={24} height={24} alt="close" />
            </button>
          </div>
          {/* Company Info */}
          <div className="hidden py-20 xl:block">
            <div className="flex justify-center">
              <Link href="/" aria-label="Go to Home">
                <Image src={logo} alt="Company Logo" width={100} height={20} />
              </Link>
            </div>
            <p className="">fdsfdsafdsaf</p>
          </div>
          {/* Mobile Menu */}
          <div className="flex text-primary xl:hidden">
            <p className="">some content</p>
          </div>
        </div>
      </ModalWrapper>
    </>
  );
}
