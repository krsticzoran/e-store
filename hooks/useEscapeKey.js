import { useEffect } from "react";

export default function useEscapeKey(callback) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") callback();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [callback]);
}
