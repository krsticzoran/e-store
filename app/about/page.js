import Image from "next/image";
import Link from "next/link";
import banner from "@/public/images/about/banner-history.webp";
import bgTea from "@/public/images/about/bg-tea.webp";
import overLay from "@/public/images/about/bg-header-overlay.svg";
import { history } from "@/data/aboutData";

export default function About() {
  return (
    <>
      {/*------Hero Section------*/}
      <section className="relative flex h-[85vh] w-full justify-center overflow-hidden md:h-[92vh]">
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
        {/* Decorative bottom edge overlay */}
        <Image
          src={overLay}
          className="absolute bottom-0 h-auto w-full"
          alt="overlay"
        />

        {/* Hero Content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center p-8 text-white md:max-w-[660px]">
          <p className="mb-5 font-semibold uppercase">
            <span className="relative top-[3px]">*</span>
            <span className="pl-4 pr-1 tracking-[8.8px]">since 2015</span>
            <span className="relative top-[2px]">*</span>
          </p>
          <h1 className="mb-5 text-center font-youngSerif text-4xl leading-[50px] md:text-5xl md:leading-[61px]">
            The Story of Ocha House
          </h1>
          <p className="text-center font-medium leading-7 md:text-lg">
            Tea has a complex positive effect on the body. Daily use of a cup of
            tea is good for your health.
          </p>
        </div>
      </section>

      {/*------ History Timeline Section ------*/}
      <section className="bg-[#f7f1ea] pb-[95px] pt-[105px] text-primary">
        <div className="relative mx-auto h-full max-w-[1320px] px-8 md:p-0">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 h-full w-[0.5px] bg-secondary md:left-1/2 md:-translate-x-1/2 md:transform"></div>

          {/* Timeline Items Container */}
          <div className="relative flex h-full flex-col justify-between">
            {history.map((item, i) => (
              <div
                key={i}
                className={`flex ${i % 2 === 0 ? "justify-start md:text-right" : "text-left md:justify-end"} py-6 md:p-6`}
              >
                {/* Content Block */}
                <div
                  className={`order-2 w-[90%] md:w-[45%] ${i % 2 === 0 ? "md:order-1" : ""}`}
                >
                  <p className="mb-4 text-5xl font-bold leading-[50px]">
                    {item.year}
                  </p>
                  <p>{item.text}</p>
                </div>
                <div
                  className={`flex w-[10%] md:w-[5%] ${i % 2 === 0 ? "md:order-2 md:justify-end" : "justify-start"}`}
                >
                  {/* Timeline Dot */}
                  <div
                    className={`mt-5 h-4 w-4 rounded-full bg-secondary ${i % 2 === 0 ? "-ml-2 md:-mr-2" : "-ml-2"} `}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*------ Our Story Section ------*/}
      <section className="relative h-full w-full">
        {/* Background image */}
        <Image
          src={bgTea}
          fill
          className="-z-20 object-cover object-center"
          alt="background"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 -z-10 bg-black/30"></div>
        <div className="relative mx-auto h-full max-w-[86%] md:max-w-[1320px]">
          {/* Content Container */}
          <div className="z-20 py-40 text-center text-white md:w-[550px] md:px-8 md:text-left">
            <p className="mb-4 font-semibold uppercase text-secondary">
              our story
            </p>
            <h2 className="mb-7 font-youngSerif text-4xl leading-[40px] md:leading-[48px]">
              Filled with delicious food, incredible Teas from around the world
            </h2>
            <p className="text-lg font-medium leading-[27px] text-[#FFFFFF99]">
              Everything in the shop has a history. One of our chandeliers dates
              back to the worlds fair in Philadelphia. If only our vintage
              teacups and teapots could talk, the stories they would tell.
            </p>

            {/* CTA Button */}
            <Link
              href="/shop"
              className="mb-14 mt-8 inline-block bg-accent px-9 py-4 font-bold uppercase tracking-[1px] text-primary duration-500 hover:bg-secondary hover:text-white focus:bg-secondary focus:text-white xl:mb-0 xl:mt-7"
              aria-label="Learn more about us"
            >
              shop now
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
