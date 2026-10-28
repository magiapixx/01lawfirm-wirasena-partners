import { gsap, SplitText } from './core';

/* Animasi generik berbasis atribut data-*. Hanya dipanggil bila motion aktif. */

// Judul muncul per baris dari balik mask. data-split="intro" langsung main saat halaman dibuka.
export function initSplits() {
  document.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
    const intro = el.dataset.split === 'intro';
    const split = SplitText.create(el, { type: 'lines', mask: 'lines' });
    gsap.set(el, { visibility: 'visible' });
    gsap.from(split.lines, {
      yPercent: 110,
      duration: 1.2,
      stagger: 0.09,
      ease: 'expo.out',
      delay: intro ? 0.15 : 0,
      scrollTrigger: intro ? undefined : { trigger: el, start: 'top 85%', once: true },
      onComplete: () => split.revert(),
    });
  });
}

// Fade naik sederhana.
export function initReveals() {
  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    const intro = el.dataset.reveal === 'intro';
    gsap.fromTo(
      el,
      { y: 40, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 1.1,
        ease: 'expo.out',
        delay: intro ? 0.4 : 0,
        scrollTrigger: intro ? undefined : { trigger: el, start: 'top 90%', once: true },
      },
    );
  });

  document.querySelectorAll<HTMLElement>('[data-stagger]').forEach((el) => {
    gsap.from(el.children, {
      y: 30,
      autoAlpha: 0,
      duration: 1,
      stagger: 0.07,
      ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });
}

// Kata demi kata menyala mengikuti scroll.
export function initWords() {
  document.querySelectorAll<HTMLElement>('[data-words]').forEach((el) => {
    const split = SplitText.create(el, { type: 'words' });
    gsap.fromTo(
      split.words,
      { opacity: 0.14 },
      { opacity: 1, stagger: 0.1, ease: 'none', scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 50%', scrub: true } },
    );
  });
}

export function initParallax() {
  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
    const speed = parseFloat(el.dataset.parallax || '0.15');
    gsap.fromTo(
      el,
      { yPercent: speed * 100 },
      { yPercent: -speed * 100, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } },
    );
  });
}

export function initCounters() {
  const fmt = new Intl.NumberFormat('id-ID');
  document.querySelectorAll<HTMLElement>('[data-counter]').forEach((el) => {
    const end = Number(el.dataset.counter);
    const state = { v: 0 };
    el.textContent = '0';
    gsap.to(state, {
      v: end,
      duration: 2.2,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      onUpdate: () => {
        el.textContent = fmt.format(Math.round(state.v));
      },
    });
  });
}

// Garis SVG tergambar mengikuti scroll (elemen memakai pathLength="1").
export function initDraw() {
  document.querySelectorAll<SVGElement>('[data-draw]').forEach((svg) => {
    gsap.fromTo(
      svg.querySelectorAll('[pathLength]'),
      { strokeDashoffset: 1 },
      {
        strokeDashoffset: 0,
        ease: 'none',
        stagger: 0.05,
        scrollTrigger: { trigger: svg, start: 'top 85%', end: 'bottom 45%', scrub: 1 },
      },
    );
  });
}

// Gambar terbuka dari bawah dengan zoom-out halus.
export function initClips() {
  document.querySelectorAll<HTMLElement>('[data-clip]').forEach((el) => {
    const intro = el.dataset.clip === 'intro';
    const tl = gsap.timeline({
      delay: intro ? 0.2 : 0,
      scrollTrigger: intro ? undefined : { trigger: el, start: 'top 85%', once: true },
    });
    tl.set(el, { visibility: 'visible' })
      .fromTo(el, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.inOut' })
      .fromTo(el.firstElementChild, { scale: 1.3 }, { scale: 1, duration: 1.8, ease: 'expo.out' }, 0.2);
  });
}
