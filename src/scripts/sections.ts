import { gsap, ScrollTrigger, SplitText, lenis, finePointer } from './core';

/* Animasi khusus tiap section. Semua fungsi aman dipanggil di halaman mana pun. */

export function heroIntro() {
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (!hero) return;
  const inner = hero.querySelector<HTMLElement>('.hero__inner')!;
  const split = SplitText.create(hero.querySelectorAll('[data-hero-line]'), { type: 'lines,chars', mask: 'lines' });

  gsap.set(inner, { visibility: 'visible' });
  gsap
    .timeline({ defaults: { ease: 'expo.out' }, onComplete: () => split.revert() })
    .from(split.chars, { yPercent: 120, rotate: 8, duration: 1.5, stagger: 0.022 })
    .from(hero.querySelectorAll('[data-hero-fade]'), { y: 24, autoAlpha: 0, duration: 1.1, stagger: 0.08 }, 0.5)
    .from(hero.querySelector('[data-hero-seal]'), { scale: 0.4, rotate: -120, autoAlpha: 0, duration: 1.8 }, 0.2)
    .from(hero.querySelector('.hero__glow'), { scale: 0.3, autoAlpha: 0, duration: 2.4, ease: 'power2.out' }, 0);
}

export function heroScroll() {
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  const stack = document.querySelector<HTMLElement>('.intro-stack');
  if (!hero || !stack) return;
  const inner = hero.querySelector<HTMLElement>('.hero__inner')!;
  const lines = hero.querySelectorAll<HTMLElement>('[data-hero-line]');
  const sealSvg = hero.querySelector('.hero__seal svg');

  // Trigger memakai pembungkus non-sticky agar posisi start/end stabil.
  const st = () => ({ trigger: stack, start: 'top top', end: () => `+=${window.innerHeight}`, scrub: true });
  gsap.to(lines[0], { xPercent: -14, ease: 'none', scrollTrigger: st() });
  gsap.to(lines[1], { xPercent: 9, ease: 'none', scrollTrigger: st() });
  gsap.to(lines[2], { xPercent: -6, ease: 'none', scrollTrigger: st() });
  gsap.to(inner, { scale: 0.88, opacity: 0.25, ease: 'none', scrollTrigger: st() });
  gsap.to(hero.querySelector('.hero__seal-scroll'), { rotate: 220, ease: 'none', scrollTrigger: st() });

  // Rotasi segel terus-menerus, dijeda saat hero tidak terlihat.
  const spin = gsap.to(sealSvg, { rotate: 360, duration: 26, ease: 'none', repeat: -1 });
  ScrollTrigger.create({
    trigger: stack,
    start: 'top top',
    end: () => `+=${window.innerHeight * 1.5}`,
    onToggle: (self) => (self.isActive ? spin.play() : spin.pause()),
  });

  // Cahaya lembut mengikuti pointer.
  const glow = hero.querySelector<HTMLElement>('.hero__glow');
  if (glow && finePointer) {
    gsap.set(glow, { xPercent: -50, yPercent: -50, x: 0, y: 0 });
    const gx = gsap.quickTo(glow, 'x', { duration: 1.4, ease: 'power3' });
    const gy = gsap.quickTo(glow, 'y', { duration: 1.4, ease: 'power3' });
    hero.addEventListener('pointermove', (e) => {
      gx(e.clientX - window.innerWidth / 2);
      gy(e.clientY - window.innerHeight / 2);
    });
  }
}

/* Marquee: kecepatan & arah mengikuti velocity Lenis, ditambah skew */
export function initMarquee() {
  const rows = gsap.utils.toArray<HTMLElement>('[data-marquee]');
  if (!rows.length) return;
  const section = rows[0].closest('section')!;
  const wrap = gsap.utils.wrap(-50, 0);
  const data = rows.map((row) => {
    const track = row.querySelector<HTMLElement>('.marquee__track')!;
    return {
      dir: Number(row.dataset.marquee) || 1,
      x: Number(row.dataset.marquee) > 0 ? 0 : -25,
      setX: gsap.quickSetter(track, 'xPercent') as (v: number) => void,
      skew: gsap.quickTo(track, 'skewX', { duration: 0.6, ease: 'power3' }),
    };
  });

  let active = false;
  ScrollTrigger.create({ trigger: section, start: 'top bottom', end: 'bottom top', onToggle: (self) => (active = self.isActive) });

  let speed = 1;
  let scrollDir = 1;
  gsap.ticker.add((_time, delta) => {
    if (!active) return;
    const v = lenis?.velocity ?? 0;
    if (Math.abs(v) > 0.2) scrollDir = v > 0 ? 1 : -1;
    const target = 1 + Math.min(Math.abs(v) * 0.18, 9);
    speed += (target - speed) * 0.08;
    const step = 0.014 * speed * scrollDir * (delta / 16.67);
    data.forEach((d) => {
      d.x = wrap(d.x - step * d.dir);
      d.setX(d.x);
      d.skew(gsap.utils.clamp(-10, 10, v * -0.35 * d.dir));
    });
  });
}

/* Bidang praktik: scroll vertikal menjadi horizontal (desktop) */
export function initHScroll() {
  const section = document.querySelector<HTMLElement>('[data-hscroll]');
  if (!section) return;
  const track = section.querySelector<HTMLElement>('[data-hscroll-track]')!;
  const progress = section.querySelector<HTMLElement>('[data-hscroll-progress]');

  gsap.matchMedia().add('(min-width: 900px)', () => {
    const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
    const tween = gsap.to(track, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${distance()}`,
        pin: true,
        scrub: 0.8,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        onUpdate: (self) => progress && gsap.set(progress, { scaleX: self.progress }),
      },
    });

    section.querySelectorAll<HTMLElement>('.pcard').forEach((card) => {
      const st = { trigger: card, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true };
      gsap.fromTo(card.querySelector('.pcard__num'), { xPercent: 35 }, { xPercent: -15, ease: 'none', scrollTrigger: st });
      gsap.fromTo(card.querySelector('.pcard__glyph'), { rotate: -90 }, { rotate: 90, ease: 'none', scrollTrigger: { ...st } });
    });
  });
}

/* Kartu pendekatan: kartu sebelumnya mengecil & meredup saat kartu berikut menumpuk */
export function initStack() {
  const cards = gsap.utils.toArray<HTMLElement>('[data-acard]');
  cards.forEach((card, i) => {
    const next = cards[i + 1];
    if (!next) return;
    gsap.to(card, {
      scale: 1 - (cards.length - i) * 0.035,
      '--dim': 0.35,
      ease: 'none',
      scrollTrigger: { trigger: next, start: 'top bottom', end: 'top 25%', scrub: true },
    });
  });
}

/* Tim: potret melayang mengikuti kursor, berganti dengan clip reveal */
export function initTeam() {
  const section = document.querySelector<HTMLElement>('[data-team]');
  if (!section || !finePointer) return;
  const float = section.querySelector<HTMLElement>('[data-team-float]')!;
  const list = section.querySelector<HTMLElement>('.team__list')!;
  const imgs = float.querySelectorAll<HTMLElement>('.team__img');

  gsap.set(float, { xPercent: -50, yPercent: -50, scale: 0.5, autoAlpha: 0 });
  const xTo = gsap.quickTo(float, 'x', { duration: 0.65, ease: 'power3' });
  const yTo = gsap.quickTo(float, 'y', { duration: 0.65, ease: 'power3' });
  const rTo = gsap.quickTo(float, 'rotation', { duration: 0.9, ease: 'power3' });
  let lastX = 0;
  let active = -1;
  let settle: gsap.core.Tween | null = null;

  list.addEventListener('pointerenter', (e) => {
    gsap.set(float, { x: e.clientX, y: e.clientY });
    lastX = e.clientX;
    gsap.to(float, { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'power3.out', overwrite: 'auto' });
  });
  list.addEventListener('pointerleave', () => {
    gsap.to(float, { autoAlpha: 0, scale: 0.5, duration: 0.4, ease: 'power3.in', overwrite: 'auto' });
  });
  list.addEventListener('pointermove', (e) => {
    xTo(e.clientX);
    yTo(e.clientY);
    rTo(gsap.utils.clamp(-14, 14, (e.clientX - lastX) * 0.8));
    lastX = e.clientX;
    settle?.kill();
    settle = gsap.delayedCall(0.12, () => rTo(0));
  });

  section.querySelectorAll<HTMLElement>('[data-trow]').forEach((row) => {
    row.addEventListener('pointerenter', () => {
      const i = Number(row.dataset.trow);
      if (i === active) return;
      const prev = active;
      active = i;
      imgs.forEach((img, j) => (img.style.zIndex = j === i ? '2' : j === prev ? '1' : '0'));
      gsap.fromTo(imgs[i], { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.7, ease: 'expo.out' });
      gsap.fromTo(imgs[i].firstElementChild, { scale: 1.3 }, { scale: 1, duration: 1, ease: 'expo.out' });
    });
  });
}

/* Kontak: lingkaran brass membesar menutup section, judul membesar */
export function initContact() {
  const s = document.querySelector<HTMLElement>('[data-contact]');
  if (!s) return;
  gsap.fromTo(
    s.querySelector('.contact__bg'),
    { clipPath: 'circle(5% at 50% 16%)' },
    { clipPath: 'circle(145% at 50% 16%)', ease: 'none', scrollTrigger: { trigger: s, start: 'top 95%', end: 'top 10%', scrub: true } },
  );
  gsap.fromTo(
    s.querySelector('[data-contact-big]'),
    { scale: 0.65, yPercent: 35 },
    { scale: 1, yPercent: 0, ease: 'none', scrollTrigger: { trigger: s, start: 'top 90%', end: 'top 5%', scrub: true } },
  );
}

export function initFooter() {
  const giant = document.querySelector<HTMLElement>('[data-footer-giant]');
  if (!giant) return;
  gsap.from(giant.children, {
    yPercent: 100,
    stagger: 0.06,
    ease: 'none',
    scrollTrigger: { trigger: giant, start: 'top bottom', end: 'bottom bottom', scrub: true },
  });
}

/* Bilah progres baca di halaman artikel */
export function initReadbar() {
  const bar = document.querySelector<HTMLElement>('[data-readbar]');
  const article = document.querySelector<HTMLElement>('[data-article]');
  if (!bar || !article) return;
  gsap.to(bar, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: article, start: 'top top', end: 'bottom bottom', scrub: true } });
}
