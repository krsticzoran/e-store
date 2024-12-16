import Image from "next/image";
import Link from "next/link";
import teaKettle from "@/public/images/tea-kettle-1.webp";
import leaf from "@/public/images/leaf.webp";
import teaLeaves from "@/public/images/tea-leaves-png-transparent-png-1.webp";
import circle from "@/public/images/circle_slide.webp";

export default function Hero() {
  return (
    <section className="bg-body-dark">
      <container className="relative mx-auto flex max-w-[1280px] items-center justify-center overflow-hidden p-5 py-40 xl:p-0 xl:py-40 2xl:max-w-[1440px] 2xl:py-64">
        <div className="absolute bottom-[100px] left-0 sm:bottom-[20px] sm:left-[5%] lg:left-[10%] xl:left-[70px] xl:top-[30%] 2xl:left-[50px] 2xl:top-[38%]">
          <Image
            src={teaLeaves}
            alt="tea leaves"
            className="w-[200px] sm:w-[320px] lg:w-[360px] xl:w-[70%] 2xl:w-[84%]"
          />
        </div>
        <Image
          src={circle}
          alt="tea leaves"
          className="absolute hidden w-[93%] xl:block 2xl:w-full"
        />
        <Image
          src={circle}
          alt="tea leaves"
          className="absolute w-[90%] sm:w-[60%] xl:w-[60%] 2xl:w-[68%]"
        />
        <div>
          <div className="z-0 flex items-center justify-center">
            <Image
              src={leaf}
              alt="tea laef"
              className="mb-8 w-[93px] xl:w-[119px] 2xl:w-[149px]"
            />
          </div>
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
            <Link href="/shop" className="z-50">
              <button
                className="border border-solid border-white bg-transparent px-9 py-4 font-urbanist text-sm font-bold uppercase leading-5 text-white transition-all hover:border-secondary hover:bg-secondary"
                style={{ letterSpacing: "1px" }}
              >
                shop now
              </button>
            </Link>
          </div>
        </div>
        <div className="absolute bottom-[20px] right-0 sm:right-[5%] lg:right-[10%] xl:-right-[200px] xl:top-1/3 2xl:-right-[150px] 2xl:top-[40%]">
          <Image
            src={teaKettle}
            priority
            alt="tea kettle"
            className="w-[200px] sm:w-[300px] lg:w-[360px] xl:w-[70%] 2xl:w-[80%]"
          />
        </div>

        <div className="absolute bottom-[20px] left-[32px] flex flex-col items-center justify-center xl:bottom-[50px] xl:left-[160px]">
          <Link
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="z-50"
          >
            <i className="fab fa-facebook-f font-medium leading-6 text-[rgba(255,255,255,0.5)] hover:text-secondary"></i>
          </Link>
          <Link
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="z-50"
          >
            <i className="fab fa-youtube font-medium leading-6 text-[rgba(255,255,255,0.5)] hover:text-secondary"></i>
          </Link>
          <Link
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="z-50"
          >
            <i className="fab fa-linkedin-in font-medium leading-6 text-[rgba(255,255,255,0.5)] hover:text-secondary"></i>
          </Link>
        </div>
      </container>
    </section>
  );
}
