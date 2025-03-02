"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import Image from "next/image";

export default function CardSlider({ items }) {
  return (
    <div className="relative px-10">
      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: ".custom-prev",
          nextEl: ".custom-next",
        }}
        spaceBetween={30}
        slidesPerView={3}
        loop
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-[300px] w-full overflow-hidden">
              <Image
                src={item.src}
                alt={item.alt}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
              <div className="h-[90px] bg-accent-second w-[190px] rounded-t-full z-50 absolute bottom-0 -left-8 flex justify-center items-center">
                <p className="text-primary font-bold">{item.text}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      
      <div className="custom-prev-container absolute left-0 top-1/2 z-10 flex -translate-y-1/2">
       
        <div className="-mr-8 h-14 w-16 rounded-full bg-white"></div>
        <button className="custom-prev bg-accent-second absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full shadow-lg hover:bg-secondary">
          ❮
        </button>
      </div>

      <div className="custom-next-container absolute right-0 top-1/2 z-10 flex -translate-y-1/2">
        <button className="custom-next bg-accent-second absolute -left-6 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full shadow-lg hover:bg-secondary">
          ❯
        </button>
       
        <div className="-ml-8 h-14 w-16 rounded-full bg-white"></div>
      </div>
    </div>
  );
}
