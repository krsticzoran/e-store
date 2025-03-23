import { useState, useEffect } from "react";
import { debounce } from "@/utils/utils";

// Custom hook to get screen size
export default function useScreenSize() {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    // Handler to call on window resize
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    const debouncedResize = debounce(handleResize, 100); // Debounce for 100ms
    // Add event listener
    window.addEventListener("resize", debouncedResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures effect runs only on mount and unmount

  return screenSize;
}
