"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import noUiSlider from "nouislider";
import "nouislider/dist/nouislider.css";

export default function PriceFilter() {
  const sliderRef = useRef(null); // Reference to the slider DOM element
  const router = useRouter();
  const pathName = usePathname();
  const [range, setRange] = useState([10, 21]);
  const primaryColor = "#2e524a"; // primary color

  // Initialize and configure the slider
  useEffect(() => {
    // Prevent duplicate initialization
    if (!sliderRef.current || sliderRef.current.noUiSlider) return;

    // Create slider instance with configuration
    noUiSlider.create(sliderRef.current, {
      start: [10, 21],
      connect: true,
      step: 1,
      range: {
        min: 10,
        max: 21,
      },
    });

    // Custom styling after slider creation
    const slider = sliderRef.current;

    // 1. Thinner track line (background)
    slider.style.height = "5px"; // Thinner track
    slider.style.background = "#e5e7eb"; // Light gray background

    // 3. Middle fill (connect) - primary color
    const connectElement = slider.querySelector(".noUi-connect");
    connectElement.style.background = primaryColor;
    connectElement.style.height = "5px"; // Match track height

    // 3. Make handles rounded
    Array.from(slider.querySelectorAll(".noUi-handle")).forEach((handle) => {
      handle.style.width = "18px"; // Smaller width
      handle.style.height = "18px"; // Smaller height
      handle.style.borderRadius = "100%";
      handle.style.background = primaryColor;
      handle.style.border = "none";
      handle.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)";
      handle.style.cursor = "pointer";

      // Center the handle vertically
      handle.style.top = "50%";
      handle.style.transform = "translateY(-50%)";
    });

    // Update state when slider values change
    sliderRef.current.noUiSlider.on("update", (values) => {
      const [min, max] = values.map(Number);
      setRange([min, max]);
    });

    // Cleanup function to destroy slider on unmount
    return () => {
      if (slider.noUiSlider) {
        slider.noUiSlider.destroy();
      }
    };
  }, []);

  const handleSearch = () => {
    // Create new URLSearchParams from current URL
    const searchParams = new URLSearchParams(window.location.search);

    // Update price parameters
    searchParams.set("pricemin", range[0].toString());
    searchParams.set("pricemax", range[1].toString());

    // Update URL without causing full page reload
    router.replace(`${pathName}?${searchParams.toString()}`, {
      scroll: false,
    });

    // Refresh data while maintaining client-side state
    router.refresh();
  };

  return (
    <div className="mb-10 mr-[18px] text-primary">
      <h4 className="mb-4 font-youngSerif text-2xl leading-8">Price Filter</h4>
      {/* Slider element */}
      <div
        ref={sliderRef}
        role="slider"
        aria-valuemin={10}
        aria-valuemax={21}
        aria-valuenow={range}
        className="my-4 w-full bg-gray-200"
      />

      {/* Price display and filter button */}
      <div className="my-2 flex items-center justify-between font-bold text-[#49584C]">
        <p>
          Selected: <span>${range[0]}</span> – <span>${range[1]}</span>
        </p>
        <button
          onClick={handleSearch}
          className="bg-transpaerent rounded border border-[0.5px] border-primary px-2 py-[5px] text-primary"
        >
          Filter
        </button>
      </div>
    </div>
  );
}
