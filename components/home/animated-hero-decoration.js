"use client";

import FadeInWrapper from "../ui/fade-in-wrapper";
import teaKettle from "@/public/images/home/hero/tea-kettle-1.webp";
import teaLeaves from "@/public/images/home/hero/tea-leaves-png-transparent-png-1.webp";
import Image from "next/image";

export default function AnimatedHeoDecorations() {
  return (
    <>
      <FadeInWrapper
        delay={1}
        x={-200}
        className="absolute bottom-[100px] left-0 aspect-[1/1] sm:bottom-[20px] sm:left-[5%] lg:left-[10%] xl:left-[70px] xl:top-[30%] 2xl:left-[50px] 2xl:top-[38%]"
      >
        <Image
          src={teaLeaves}
          alt=""
          aria-hidden="true"
          role="presentation"
          priority
          width={450}
          height={450}
          quality={70}
          sizes="(max-width: 640px) 200px, (max-width: 1024px) 360px, (max-width: 1280px) 450px, 500px"
          className="w-[200px] sm:w-[320px] lg:w-[360px] xl:w-[450px] 2xl:w-[500px]"
        />
      </FadeInWrapper>
      <FadeInWrapper
        delay={1}
        x={200}
        className="absolute bottom-[20px] right-0 z-20 aspect-[1/1] sm:right-[5%] lg:right-[10%] xl:right-[80px] xl:top-[45%] 2xl:right-[100px] 2xl:top-[50%]"
      >
        <Image
          src={teaKettle}
          alt=""
          aria-hidden="true"
          role="presentation"
          priority
          width={450}
          height={450}
          sizes="(max-width: 640px) 200px, (max-width: 1024px) 360px, (max-width: 1280px) 400px, 450px"
          className="w-[200px] sm:w-[300px] lg:w-[360px] xl:w-[400px] 2xl:w-[450px]"
          quality={70}
        />
      </FadeInWrapper>
    </>
  );
}
