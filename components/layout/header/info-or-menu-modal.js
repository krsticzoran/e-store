"use client";
import { useState } from "react";
import ModalWrapper from "@/components/ui/modal-wrapper";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/icons/logo.svg";
import { socialIconsData } from "@/data/socialIconsData";
import SocialIcons from "@/components/ui/social-icons";
import TeaBig from "@/public/images/header/tea-big.svg";
import { companyInfo } from "@/data/headerData";
import useEscapeKey from "@/hooks/useEscapeKey";

export default function InfoOrMenuModal() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  // Use the hook to close modal on Escape key
  useEscapeKey(() => setIsOpen(false));

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
          className="h-full flex-grow overflow-auto bg-black opacity-50"
          onClick={toggleModal}
        ></div>

        {/* Panel */}
        <div className="z-50 flex h-full w-full flex-col overflow-auto bg-white p-5 font-urbanist text-primary text-white opacity-100 sm:w-[500px] xl:bg-[#132420]">
          <div className="flex justify-end">
            <button onClick={toggleModal} aria-label="Close modal">
              <i
                className="fa-solid fa-xmark text-xl text-primary opacity-75 xl:text-white"
                aria-hidden="true"
              ></i>
            </button>
          </div>
          {/* Company Info */}
          <div className="y-auto my-auto hidden xl:block">
            <div className="flex justify-center">
              <Link href="/" aria-label="Go to Home">
                <Image src={logo} alt="Company Logo" width={100} height={20} />
              </Link>
            </div>
            <h4 className="mb-10 mt-12 text-center font-youngSerif text-2xl capitalize leading-8">
              say hello!
            </h4>
            <ul>
              {companyInfo.map((el, i) => (
                <li
                  key={i}
                  className="mt-[6px] flex justify-center pb-[6px] text-[#FFFFFF99] hover:text-secondary focus:text-secondary"
                >
                  <a href={el.href} className="font-medium">
                    {el.text}
                  </a>
                </li>
              ))}
            </ul>

            <ul className="my-10 flex justify-center">
              {socialIconsData.map((el, i) => (
                <li key={i} className="z-10 pr-4">
                  <SocialIcons
                    el={el}
                    iconStyle="font-medium leading-6 text-[#818a91] text-lg hover:text-secondary focus:text-secondary"
                    className=""
                  />
                </li>
              ))}
            </ul>
            <div className="flex justify-center">
              <Image
                src={TeaBig}
                width={388}
                height={193}
                alt="tea decoration image"
              />
            </div>
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
