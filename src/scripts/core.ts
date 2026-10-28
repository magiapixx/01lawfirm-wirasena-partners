import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { Flip } from 'gsap/Flip';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText, Flip);

export const root = document.documentElement;
// Kelas `motion` dipasang di <head> bila pengguna tidak meminta reduced motion.
export const motionOK = root.classList.contains('motion');
export const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

export let lenis: Lenis | null = null;

export function initLenis() {
  if (!motionOK) return;
  lenis = new Lenis({ lerp: 0.1 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis?.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

export function scrollToTarget(target: HTMLElement | number) {
  if (lenis) {
    lenis.scrollTo(target, { duration: 1.6, force: true });
  } else if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: 'smooth' });
  } else {
    target.scrollIntoView({ behavior: 'smooth' });
  }
}

export { gsap, ScrollTrigger, SplitText, Flip };
