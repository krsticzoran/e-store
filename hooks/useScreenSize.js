import { useState, useEffect } from "react";
import { debounce } from "@/utils/utils";

// Custom hook to get screen size
export default function useScreenSize() {
  const [screenSize, setScreenSize] = useState(1280);

  useEffect(() => {
    // Only update if window is available (client-side)
    if (typeof window === "undefined") {
      return;
    }

    // Handler to call on window resize
    const handleResize = () => {
      // Only update state if the screen is smaller than our default
      // This prevents layout shifts for desktop users
      if (window.innerWidth < 1280) {
        setScreenSize(window.innerWidth);
      }
    };

    // Initialize with actual size if smaller than default
    if (window.innerWidth < 1280) {
      setScreenSize(window.innerWidth);
    }

    const debouncedResize = debounce(handleResize, 100); // Debounce for 100ms
    // Add event listener
    window.addEventListener("resize", debouncedResize);

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", debouncedResize);
  }, []); // Empty array ensures effect runs only on mount and unmount

  return screenSize;
}
