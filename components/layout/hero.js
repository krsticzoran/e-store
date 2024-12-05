import Image from "next/image";
import teaKettle from "@/public/images/tea-kettle-1.webp";
import leaf from "@/public/images/leaf.webp";
import teaLeaves from "@/public/images/tea-leaves-png-transparent-png-1.webp";
import circle from "@/public/images/circle_slide.webp";

export default function Hero() {
  return (
    <section className="bg-body-dark">
      <container className="relative flex items-center justify-center h-screen  mx-auto">
        <div className="absolute top-[30%] left-[120px] ">
          <Image src={teaLeaves} alt="tea leaves" className="w-[75%]" />
        </div>
        <Image src={circle} alt="tea leaves" className="w-[90%] absolute" />
        <Image src={circle} alt="tea leaves" className="w-[60%] absolute" />
        <div>
          <div className="flex items-center justify-center">
            <Image src={leaf} priority alt="tea laef" className=" mb-8" />
          </div>
          <p
            className="text-lg uppercase text-center text-white font-bold  leading-6 font-urbanist"
            style={{ letterSpacing: "5px" }}
          >
            Hand made tea set
          </p>
          <h1 className="my-12 capitalize font-medium text-4xl leading-[113px] font-betterworks text-secondary">
            organic tea house
          </h1>
          <div className="flex items-center justify-center">
            <button
              className="uppercase text-white text-sm font-bold leading-5 px-9 py-4 border border-solid border-white bg-transparent hover:bg-secondary hover:border-secondary transition-all font-urbanist"
              style={{ letterSpacing: "1px" }}
            >
              shop now
            </button>
          </div>
        </div>
        <div className="absolute top-1/3 -right-[200px]">
          <Image
            src={teaKettle}
            priority
            alt="tea kettle"
            className="w-[70%] "
          />
        </div>

        <p></p>
      </container>
    </section>
  );
}
