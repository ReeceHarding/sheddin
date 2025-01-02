import { useEffect, useRef } from 'react';

export function useScrollIntoView<T extends HTMLElement>(shouldScroll: boolean) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (shouldScroll && ref.current) {
      // Use requestAnimationFrame for smoother scrolling
      requestAnimationFrame(() => {
        ref.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      });
    }
  }, [shouldScroll]);

  return ref;
}