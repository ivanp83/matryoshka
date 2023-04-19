import { useState, useEffect } from "react";

export default function useWindowSize() {
  const isClient = typeof window === "object";
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
    isMobile: false,
    orientation: "",
  });
  useEffect(() => {
    function handleResize() {
      if (!isClient)
        return {
          width: 0,
          height: 0,
          isMobile: false,
        };
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: /iPhone|iPad|iPod|Android/i.test(navigator.userAgent),
        orientation: window.matchMedia("(orientation: portrait)").matches
          ? "portrait"
          : "landscape",
      });
    }

    window.addEventListener("orientationchange", handleResize);
    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("orientationchange", handleResize);
      window.removeEventListener("resize", handleResize);
    };
  }, [isClient]);
  return windowSize;
}
