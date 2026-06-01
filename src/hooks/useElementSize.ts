import { useLayoutEffect, useRef, useState } from "react";

export function useElementSize<TElement extends HTMLElement>() {
  const ref = useRef<TElement | null>(null);
  const [size, setSize] = useState({ width: 960, height: 640 });

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const observer = new ResizeObserver(([entry]) => {
      const width = Math.max(360, Math.round(entry.contentRect.width));
      const height = Math.max(560, Math.round(entry.contentRect.height));
      setSize({ width, height });
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, size };
}
