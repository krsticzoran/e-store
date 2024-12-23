"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function CardSlider({ items = [] }) {
  const visibleCount = 3; // Number of visible images
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Clone items for seamless looping
  const extendedItems =
    items.length > 0
      ? [
          ...items.slice(-visibleCount),
          ...items,
          ...items.slice(0, visibleCount),
        ]
      : [];

  console.log(currentIndex);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  // Handle infinite loop effect with smooth transition
  useEffect(() => {
    if (!isTransitioning) return;

    const timeout = setTimeout(() => {
      // After the transition is complete, reset transition state
      setIsTransitioning(false);

      // Wrap around without visual jump
      if (currentIndex >= items.length) {
        setCurrentIndex(0); // Loop back to the start
      } else if (currentIndex < 0) {
        setCurrentIndex(items.length - 1); // Loop back to the end
      }
    }, 500); // Match the CSS transition duration

    return () => clearTimeout(timeout);
  }, [currentIndex, isTransitioning, items.length]);

  return (
    <div className="relative mx-auto w-full max-w-3xl overflow-hidden">
      {/* Slider container */}
      <div
        className={`flex transition-transform duration-500 ${
          isTransitioning ? "" : "transition-none"
        }`}
        style={{
          transform: `translateX(-${(currentIndex * 100) / visibleCount}%)`, // Adjust for 3 images
        }}
      >
        {extendedItems.map((item, index) => (
          <div
            key={index}
            className="flex w-[calc(100%/3)] flex-shrink-0 items-center justify-center bg-gray-200"
          >
            <Image
              src={item.src}
              alt={`Image ${index + 1}`}
              width={320}
              height={400}
              className="h-[300px] w-full rounded-lg object-cover"
            />
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 transform rounded-full bg-black p-2 text-white hover:bg-gray-800"
      >
        ❮
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 transform rounded-full bg-black p-2 text-white hover:bg-gray-800"
      >
        ❯
      </button>
    </div>
  );
}
