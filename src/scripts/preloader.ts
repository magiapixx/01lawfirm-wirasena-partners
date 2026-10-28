import { gsap } from './core';

// Hitungan 0–100, lalu tirai naik. Resolve sebelum tirai selesai agar intro hero tumpang tindih.
export function runPreloader(): Promise<void> {
  const el = document.querySelector<HTMLElement>('.preloader');
  if (!el || getComputedStyle(el).display === 'none') return Promise.resolve();

  try {
    sessionStorage.setItem('wp-loaded', '1');
  } catch {}

  const count = el.querySelector<HTMLElement>('[data-pl-count]')!;
  const bar = el.querySelector<HTMLElement>('[data-pl-bar]')!;
  const inner = el.querySelector<HTMLElement>('.preloader__inner')!;
  const letters = el.querySelectorAll('.preloader__name span');
  const meta = el.querySelectorAll('.preloader__meta > *');
  const state = { v: 0 };

  return new Promise((resolve) => {
    gsap
      .timeline({ onComplete: () => el.remove() })
      .from(letters, { yPercent: 110, duration: 1, stagger: 0.03, ease: 'expo.out' })
      .from(meta, { autoAlpha: 0, y: 10, duration: 0.6, stagger: 0.1 }, 0.2)
      .to(
        state,
        {
          v: 100,
          duration: 1.8,
          ease: 'power3.inOut',
          onUpdate: () => {
            count.textContent = String(Math.round(state.v));
          },
        },
        0.2,
      )
      .to(bar, { scaleX: 1, duration: 1.8, ease: 'power3.inOut' }, 0.2)
      .to(inner, { y: -60, autoAlpha: 0, duration: 0.7, ease: 'power3.in' }, '+=0.15')
      .to(el, { clipPath: 'inset(0% 0% 100% 0%)', duration: 1.1, ease: 'expo.inOut' }, '-=0.3')
      .add(() => resolve(), '-=1');
  });
}
