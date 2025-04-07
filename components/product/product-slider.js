"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import Image from "next/image";
import { useState } from "react";

export default function ProductSlider({ product }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [mainSwiper, setMainSwiper] = useState(null);


  return (
    <div className="space-y-4">
      {/* Main Slider */}
      <Swiper
        modules={[Navigation, Thumbs]}
        navigation={{
          prevEl: ".custom-prev",
          nextEl: ".custom-next",
        }}
        spaceBetween={10}
        slidesPerView={1}
        thumbs={{ swiper: thumbsSwiper }}
        onSwiper={setMainSwiper}
      >
        {product.images.slice(0,4).map((item, index) => (
          <SwiperSlide key={`main-${index}`}>
            <div className="relative h-[480px] w-full overflow-hidden">
              <Image
                src={item.src}
                alt={item.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="rounded-lg object-cover object-center"
                priority={index === 0}
              />
            </div>
          </SwiperSlide>
        ))}
        
        {/* Navigation Buttons */}
        <div className="custom-prev-container absolute left-0 top-1/2 z-10 flex -translate-y-1/2">
          <button
            className="custom-prev absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg hover:bg-secondary"
            aria-label="Previous Slide"
          >
            ❮
          </button>
        </div>
        <div className="custom-next-container absolute right-0 top-1/2 z-10 flex -translate-y-1/2">
          <button
            className="custom-next absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg hover:bg-secondary"
            aria-label="Next Slide"
          >
            ❯
          </button>
        </div>
      </Swiper>

      {/* Thumbnail Slider */}
      <div className="px-12"> 
        <Swiper
          modules={[Thumbs]}
          watchSlidesProgress
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
        >
          {product.images.slice(0,4).map((item, index) => (
            <SwiperSlide key={`thumb-${index}`}>
              <button 
                onClick={() => mainSwiper?.slideTo(index)}
                className="relative h-[100px] w-[100px] overflow-hidden rounded-lg border-2 border-transparent transition-all hover:border-primary"
              >
                <Image
                  src={item.src}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover object-center"
                />
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}