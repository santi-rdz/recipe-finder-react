import { useEffect, useRef, useState } from "react";

export function usePersistenIntersectionObserver(options) {
  const ref = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    observer.observe(element);
  }, [options]);

  return [ref, isIntersecting];
}
