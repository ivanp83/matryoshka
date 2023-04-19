import { useEffect, useRef, useState } from "react";

const useIntersectionObserver = () => {
  const [inView, setInView] = useState<boolean>(false);
  const nodeRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver((entries, obs) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      }
    }, {});
    if (nodeRef.current) observer.observe(nodeRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);
  return { nodeRef, inView };
};
export default useIntersectionObserver;
