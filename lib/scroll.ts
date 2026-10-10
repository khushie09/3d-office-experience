import type Lenis from 'lenis';

export const scrollState: { lenis: Lenis | null } = { lenis: null };

export function scrollToY(y: number) {
  if (scrollState.lenis) {
    scrollState.lenis.scrollTo(y, { duration: 1.6 });
  } else {
    window.scrollTo({ top: y });
  }
}
