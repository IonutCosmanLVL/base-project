'use client';
import { useEffect, useState } from 'react';

/**
 * React hook to check if a given media query matches.
 * Example: const isMobile = useMediaQuery('(max-width: 767px)');
 */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(query);

    // Set initial state
    setMatches(mediaQuery.matches);

    // Update state on change
    const handler = (event: MediaQueryListEvent) => setMatches(event.matches);

    // Modern browsers
    mediaQuery.addEventListener?.('change', handler);

    // Fallback for Safari/older
    mediaQuery.addListener?.(handler);

    return () => {
      mediaQuery.removeEventListener?.('change', handler);
      mediaQuery.removeListener?.(handler);
    };
  }, [query]);

  return matches;
}
// This useMediaQuery hook allows components to respond to CSS media query changes in real-time.