"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

export default function CardSlider({ items }) {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      navigation
      pagination={{ clickable: true }}
      spaceBetween={30}
      slidesPerView={3}
      loop
    >
      {items.map((item, index) => (
        <SwiperSlide key={index}>
          <div className="relative h-[300px] w-full">
            <Image
              src={item.src}
              alt={item.alt}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
