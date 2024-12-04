import Image from "next/image";
import teaKettle from "@/public/images/tea-kettle-1.webp";
import leaf from "@/public/images/leaf.webp";
import teaLeaves from "@/public/images/tea-leaves-png-transparent-png-1.webp";
import classes from "@/styles/pages/home.module.scss";
export default function Hero() {
  return (
    <section className={`${classes["hero-section"]}  `}>
      <container className="relative flex items-center justify-center h-screen max-w-[1280px] mx-auto">
        <div className="absolute top-1/5 left-0 ">
          <Image
            src={teaLeaves}
            priority
            alt="tea leaves"
            className="w-[94%] hidden"
          />
        </div>
        <div>
          <div className="flex items-center justify-center">
            <Image src={leaf} priority alt="tea laef" className=" mb-8" />
          </div>
          <p className="text-lg uppercase text-center text-white font-bold tracking-wider leading-6">
            Hand made tea set
          </p>
          <h1 className="my-12 capitalize font-medium text-5xl leading-[113px]">
            organic tea house
          </h1>
          <button>shop now</button>
        </div>
        <div className="absolute top-1/5 right-0  hidden">
          <Image
            src={teaKettle}
            priority
            alt="tea kettle"
            className="w-[94%]"
          />
        </div>

        <p></p>
      </container>
    </section>
  );
}
