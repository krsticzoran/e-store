import Image from "next/image";
import Link from "next/link";
import leaf from "@/public/images/home/hero/leaf.webp";
import circle from "@/public/images/home/hero/circle_slide.webp";
import { socialIconsData } from "@/data/socialIconsData";
import SocialIcons from "../ui/social-icons";
import AnimatedHeoDecorations from "./animated-hero-decoration";

export default function Hero() {
  return (
    <section className="bg-body-dark">
      <div className="relative mx-auto flex max-w-[1280px] items-center justify-center overflow-hidden p-5 py-40 xl:p-0 xl:py-40 2xl:max-w-[1440px] 2xl:py-64">
        <div>
          {/* Central content container with text and CTA */}
          <div className="z-0 flex items-center justify-center">
            {/* Decorative leaf image  */}
            <Image
              src={leaf}
              alt="tea laef"
              className="mb-8 w-[93px] xl:w-[119px] 2xl:w-[149px]"
              aria-label="Decorative element"
              quality={70}
              width={149}
              height={149}
            />
          </div>
          {/* Primary heading and subheading */}
          <p
            className="text-center font-urbanist text-lg font-bold uppercase leading-6 text-white"
            style={{ letterSpacing: "5px" }}
          >
            Hand made tea set
          </p>
          <h1 className="my-6 text-center font-betterworks text-3xl font-medium capitalize leading-[113px] text-secondary xl:my-12 xl:text-4xl 2xl:text-5xl 2xl:leading-[120px]">
            organic tea house
          </h1>
          <div className="flex items-center justify-center">
            {/* CTA - shop now */}
            <Link
              href="/shop"
              style={{ letterSpacing: "1px" }}
              className="z-50 border border-solid border-white bg-transparent px-9 py-4 font-urbanist text-sm font-bold uppercase leading-5 text-white transition-all duration-500 hover:border-secondary hover:bg-secondary"
              aria-label="see products in our shop"
            >
              shop now
            </Link>
          </div>
        </div>

        {/*social icons*/}
        <ul className="absolute bottom-[20px] left-[20px] flex flex-col items-center justify-center xl:bottom-[50px] xl:left-[160px]">
          {socialIconsData.slice(0, 3).map((el, i) => (
            <li key={i} className="z-50">
              <SocialIcons
                el={el}
                iconStyle="font-medium leading-6 text-[rgba(255,255,255,0.5)]"
                className=""
              />
            </li>
          ))}
        </ul>
        {/* Decorative images */}
        <AnimatedHeoDecorations />
        <Image
          src={circle}
          alt="tea leaves"
          className="absolute hidden w-[93%] xl:block 2xl:w-full"
          aria-label="decorative element"
          quality={70}
        />
        <Image
          src={circle}
          alt="tea leaves"
          className="absolute w-[90%] sm:w-[60%] xl:w-[60%] 2xl:w-[68%]"
          aria-label="decorative element"
          quality={70}
        />
      </div>
    </section>
  );
}
