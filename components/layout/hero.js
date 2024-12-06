import Image from "next/image";
import teaKettle from "@/public/images/tea-kettle-1.webp";
import leaf from "@/public/images/leaf.webp";
import teaLeaves from "@/public/images/tea-leaves-png-transparent-png-1.webp";
import circle from "@/public/images/circle_slide.webp";

export default function Hero() {
  return (
    <section className="bg-body-dark">
      <container className="relative mx-auto flex h-screen items-center justify-center">
        <div className="absolute left-[120px] top-[30%]">
          <Image src={teaLeaves} alt="tea leaves" className="w-[75%]" />
        </div>
        <Image src={circle} alt="tea leaves" className="absolute w-[90%]" />
        <Image src={circle} alt="tea leaves" className="absolute w-[60%]" />
        <div>
          <div className="flex items-center justify-center">
            <Image src={leaf} priority alt="tea laef" className="mb-8" />
          </div>
          <p
            className="text-center font-urbanist text-lg font-bold uppercase leading-6 text-white"
            style={{ letterSpacing: "5px" }}
          >
            Hand made tea set
          </p>
          <h1 className="my-12 font-betterworks text-4xl font-medium capitalize leading-[113px] text-secondary">
            organic tea house
          </h1>
          <div className="flex items-center justify-center">
            <button
              className="border border-solid border-white bg-transparent px-9 py-4 font-urbanist text-sm font-bold uppercase leading-5 text-white transition-all hover:border-secondary hover:bg-secondary"
              style={{ letterSpacing: "1px" }}
            >
              shop now
            </button>
          </div>
        </div>
        <div className="absolute -right-[200px] top-1/3">
          <Image
            src={teaKettle}
            priority
            alt="tea kettle"
            className="w-[70%]"
          />
        </div>

        <p></p>
      </container>
    </section>
  );
}
