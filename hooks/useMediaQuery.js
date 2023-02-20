import { useEffect, useState } from 'react';

export default function useMediaQuery(width) {
  const [targetReached, setTargetReached] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${width}px)`);

    //initial window width matches media query?
    media.matches && setTargetReached(true);

    //window width change, still matches when window width change?
    const updateTarget = (e) => (e.matches ? setTargetReached(true) : setTargetReached(false));

    media.addEventListener('change', updateTarget);

    return () => media.removeEventListener('change', updateTarget);
  }, [width]);

  return targetReached;
}
