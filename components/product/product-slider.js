"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";

export default function ProductSlider({ product }) {
  return (
    <>
      {" "}
      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: ".custom-prev",
          nextEl: ".custom-next",
        }}
        spaceBetween={30}
        slidesPerView={1}
        loop
      >
        {product.images.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-[480px] w-full overflow-hidden">
              <Image
                src={item.src}
                alt={item.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="rounded-lg object-cover object-center"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Custom Previous Button */}
      <div className="custom-prev-container absolute left-0 top-1/2 z-10 flex -translate-y-1/2">
        <div className="-mr-8 h-14 w-16 rounded-full bg-transparent"></div>
        <button
          className="custom-prev absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg hover:bg-secondary"
          aria-label="Previous Slide"
        >
          ❮
        </button>
      </div>
      {/* Custom Next Button */}
      <div className="custom-next-container absolute right-0 top-1/2 z-10 flex -translate-y-1/2">
        <button
          className="custom-next absolute -left-6 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg hover:bg-secondary"
          aria-label="Next Slide"
        >
          ❯
        </button>
        <div className="-ml-8 h-14 w-16 rounded-full bg-transparent"></div>
      </div>
    </>
  );
}
