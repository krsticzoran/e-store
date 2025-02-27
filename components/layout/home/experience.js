import CardSlider from "@/components/ui/card-slider";
import Image from "next/image";
import { items,experienceArr,experienceArrTwo } from "@/data/home";
import ExperienceCard from "@/components/ui/experienceCard";


export default function Experience() {
  return (
    <section className="mx-auto mt-[90px]  xl:max-w-[1280px]">
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
      <div className="py-20 flex">
        <div className="w-1/2 bg-accent" >
        <ul >
          {experienceArr.map((el,i)=>(
            <ExperienceCard el={el} i={i} variant="light" data={experienceArr} />
          ))}
      
       </ul>
        </div>
        <div className="w-1/2  bg-primary" >
        <ul >
          {experienceArrTwo.map((el,i)=>(
             <ExperienceCard el={el} i={i} variant="dark" data={experienceArrTwo} />
          ))}
      
       </ul></div>
      </div>
    </section>
  );
}
