import CardSlider from "@/components/home/card-slider";
import Image from "next/image";
import { items, experienceArr, experienceArrTwo } from "@/data/homeData";
import ExperienceCard from "@/components/home/experienceCard";
import oolong from "@/public/images/home/experience/oolong.webp";
import wing from "@/public/images/home/experience/pngwing.webp";
import leaf from "@/public/images/home/experience/leaf.webp";

export default function Experience() {
  return (
    <section className="mx-auto mt-[90px] xl:max-w-[1280px]">
      <div className="flex">
        <div className="w-[36%]">
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
          <button className="mt-7 bg-accent px-9 py-4 font-bold uppercase tracking-[1px] text-primary">
            learn more
          </button>
        </div>
        <div className="w-[64%]">
          <CardSlider items={items} />
        </div>
      </div>
      <div className="relative flex py-20">
        <Image
          src={wing}
          width={215}
          height={154}
          alt="pngwing"
          className="absolute bottom-28 left-1/2 z-30 translate-x-6"
        />
        <Image
          src={leaf}
          width={152}
          height={221}
          alt="leaf"
          className="absolute left-1/2 top-10 z-0 -translate-x-[170px]"
        />
        <Image
          src={oolong}
          width={500}
          height={500}
          alt="oolong"
          className="absolute left-1/2 top-0 z-20 -translate-x-[100px]"
        />
        <div className="w-1/2 bg-accent">
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
        <div className="w-1/2 bg-primary">
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
