import CardSlider from "@/components/ui/card-slider";

import Link from "next/link";

import blackTea from "@/public/images/home/experience/black-tea.webp";
import chai from "@/public/images/home/experience/chai.webp";
import greenTea from "@/public/images/home/experience/Green-tea.webp";
import japaneseMatcha from "@/public/images/home/experience/Japanese-matcha.webp";

const items = [blackTea, chai, greenTea, japaneseMatcha];

export default function Experience() {
  return (
    <section className="mx-auto mt-[90px] flex xl:max-w-[1280px]">
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
    </section>
  );
}
