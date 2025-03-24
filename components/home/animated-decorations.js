"use client";
import Image from "next/image";
import oolong from "@/public/images/home/experience/oolong.webp";
import wing from "@/public/images/home/experience/pngwing.webp";
import leaf from "@/public/images/home/experience/leaf.webp";
import FadeInWrapper from "../ui/fade-in-wrapper";

export default function AnimatedDecorations() {
  return (
    <>
      <FadeInWrapper
        className="absolute bottom-28 left-1/2 z-30 hidden translate-x-6 xl:block"
        delay={1}
        x={100}
      >
        <Image
          src={wing}
          width={215}
          height={154}
          alt="pngwing"
          aria-hidden="true"
        />
      </FadeInWrapper>
      <FadeInWrapper
        className="absolute left-1/2 top-10 z-0 hidden xl:block"
        delay={1}
        x={-100}
        animatex={-170}
      >
        <Image
          src={leaf}
          width={152}
          height={221}
          alt="leaf"
          aria-hidden="true"
        />
      </FadeInWrapper>
      <FadeInWrapper
        className="absolute left-1/2 top-0 z-20 hidden xl:block"
        delay={1}
        x={-100}
        animatex={-100}
        y={100}
        opacity={1}
      >
        <Image
          src={oolong}
          width={500}
          height={500}
          alt="oolong"
          aria-hidden="true"
        />
      </FadeInWrapper>
    </>
  );
}
