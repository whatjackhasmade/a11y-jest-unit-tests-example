import { useEffect, useState } from "react";

import { useIsomorphicLayoutEffect } from "usehooks-ts";

type UseScrollLockOutput = {
  isLocked: boolean;
  setIsLocked: (value: boolean) => void;
};

export function useScrollLock(initialLocked = false): UseScrollLockOutput {
  const [isLocked, setIsLocked] = useState(initialLocked);

  // Do the side effect before render
  useIsomorphicLayoutEffect(() => {
    if (!isLocked) {
      return;
    }

    // Save initial body style
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    // Lock body scroll
    document.body.style.overflow = "hidden";

    // Get the scrollBar width
    const root = document.body; // or root
    const scrollBarWidth = root ? root.offsetWidth - root.scrollWidth : 0;

    // Avoid width reflow
    if (scrollBarWidth) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }

    return () => {
      document.body.style.overflow = originalOverflow;

      if (scrollBarWidth) {
        document.body.style.paddingRight = originalPaddingRight;
      }
    };
  }, [isLocked]);

  // Update state if initialValue changes
  useEffect(() => {
    if (isLocked !== initialLocked) {
      setIsLocked(initialLocked);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialLocked]);

  return {
    isLocked,
    setIsLocked
  };
}

export default useScrollLock;
