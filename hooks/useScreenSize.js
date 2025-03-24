import { useState, useEffect } from "react";
import { debounce } from "@/utils/utils";

// Custom hook to get screen size
export default function useScreenSize() {
  const [screenSize, setScreenSize] = useState(1280);

  useEffect(() => {
    // Handler to call on window resize
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };

    // Call handler right away so state gets updated with initial window size
    handleResize();

    const debouncedResize = debounce(handleResize, 100); // Debounce for 100ms
    // Add event listener
    window.addEventListener("resize", debouncedResize);

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures effect runs only on mount and unmount

  return screenSize;
}
