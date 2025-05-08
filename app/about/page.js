import Image from "next/image";
import banner from "@/public/images/about/banner-history.webp";
import overLay from "@/public/images/about/bg-header-overlay.svg";
export default function About() {
  return (
    <>
      {/*------Hero Section------*/}
      <div className="relative flex h-[92vh] w-full justify-center overflow-hidden">
        {/* Background image with parallax effect*/}
        <div className="fixed inset-0 -z-20">
          <Image
            priority
            src={banner}
            fill
            className="object-cover object-center"
            alt="background"
          />
        </div>

        {/* Dark overlay */}
        <div className="absolute inset-0 -z-10 bg-black/30"></div>
        {/* Bottom overlay */}
        <Image
          src={overLay}
          className="absolute bottom-0 h-auto w-full"
          alt="overlay"
        />

        {/*  Content */}
        <div className="relative z-10 flex h-full max-w-[660px] flex-col items-center justify-center p-8 text-white">
          <p className="mb-5 font-semibold uppercase">
            <span className="relative top-[3px]">*</span>
            <span className="pl-4 pr-1 tracking-[8.8px]">since 2015</span>
            <span className="relative top-[2px]">*</span>
          </p>
          <h1 className="mb-5 font-youngSerif text-5xl leading-[61px]">
            The Story of Ocha House
          </h1>
          <p className="text-center text-lg font-medium leading-7">
            Tea has a complex positive effect on the body. Daily use of a cup of
            tea is good for your health.
          </p>
        </div>
      </div>

      {/*------History Section------*/}
      <div className="h-screen bg-[#f7f1ea]"></div>
    </>
  );
}
