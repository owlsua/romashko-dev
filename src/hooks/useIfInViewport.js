import { useState, useEffect, useMemo } from 'react';

const useIsInViewport = (ref) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  const observer = useMemo(
    () =>
      typeof window !== 'undefined' &&
      new IntersectionObserver(([entry]) =>
        setIsIntersecting(entry.isIntersecting),
      ),
    [],
  );

  useEffect(() => {
    setTimeout(() => {
      ref.current && observer.observe(ref.current);
    }, 500);

    return () => {
      observer.disconnect();
    };
  }, [ref, observer]);

  return isIntersecting;
};

export default useIsInViewport;
