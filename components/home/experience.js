import CardSlider from "@/components/home/card-slider";

import Link from "next/link";
import { items, experienceArr, experienceArrTwo } from "@/data/homeData";
import ExperienceCard from "@/components/home/experience-card";
import AnimatedDecorations from "./animated-decorations";

export default function Experience() {
  return (
    <section className="mx-auto mt-[90px] px-5 xl:max-w-[1280px] xl:px-0">
      <div className="xl:flex">
        {/* Left Column: Text Content */}
        <div className="xl:w-[36%]">
          <p className="mb-[14px] font-bold uppercase text-secondary">
            Experience
          </p>
          <h2 className="mb-6 font-youngSerif text-4xl font-normal leading-[50px] text-primary">
            The Story Behind Our Ocha House
          </h2>
          <p className="mb-[10px] text-lg font-medium leading-7 text-primary">
            We also specialize in bubble tea, a beverage originating from Taiwan
            that combines freshly brewed teas with a large variety of exotic
            natural fruit concentrates, served cold with delicious chewy tapioca
            pearls.
          </p>
          <Link
            href="/about"
            className="mb-14 mt-4 inline-block bg-accent px-9 py-4 font-bold uppercase tracking-[1px] text-primary duration-500 hover:bg-secondary hover:text-white focus:bg-secondary focus:text-white xl:mb-0 xl:mt-7"
            aria-label="Learn more about us"
          >
            learn more
          </Link>
        </div>
        {/* Right Column: Card Slider */}
        <div className="xl:w-[64%]">
          <CardSlider items={items} />
        </div>
        {/* Experience Cards Section */}
      </div>
      <div className="relative py-20 lg:flex">
        {/* Decorative Images */}
        <AnimatedDecorations />
        {/* Left Column: Light Background Experience Cards */}
        <div className="bg-accent lg:w-1/2">
          <ul>
            {experienceArr.map((el, i) => (
              <li key={i}>
                <ExperienceCard
                  el={el}
                  index={i}
                  variant="light"
                  length={experienceArr.length}
                />
              </li>
            ))}
          </ul>
        </div>
        {/* Right Column: Dark Background Experience Cards */}
        <div className="bg-primary lg:w-1/2">
          <ul>
            {experienceArrTwo.map((el, i) => (
              <li key={i}>
                <ExperienceCard
                  el={el}
                  index={i}
                  variant="dark"
                  length={experienceArrTwo.length}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
