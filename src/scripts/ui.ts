import { gsap, lenis, root, motionOK, finePointer, scrollToTarget } from './core';

/* Kursor: titik cepat + cincin lambat; label dari atribut data-cursor */
export function initCursor() {
  const cur = document.querySelector<HTMLElement>('.cursor');
  if (!cur || !motionOK || !finePointer) return;

  const dot = cur.querySelector<HTMLElement>('.cursor__dot')!;
  const ring = cur.querySelector<HTMLElement>('.cursor__ring')!;
  const label = cur.querySelector<HTMLElement>('[data-cursor-label]')!;
  const dx = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3' });
  const dy = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3' });
  const rx = gsap.quickTo(ring, 'x', { duration: 0.55, ease: 'power3' });
  const ry = gsap.quickTo(ring, 'y', { duration: 0.55, ease: 'power3' });

  window.addEventListener(
    'pointermove',
    (e) => {
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
      cur.classList.remove('is-out');
    },
    { passive: true },
  );
  root.addEventListener('pointerleave', () => cur.classList.add('is-out'));

  document.addEventListener('pointerover', (e) => {
    const t = (e.target as Element).closest('[data-cursor], a, button, label, input, select, textarea');
    const text = t?.getAttribute('data-cursor') ?? '';
    cur.classList.toggle('is-hover', !!t && !text);
    cur.classList.toggle('is-label', !!text);
    label.textContent = text;
  });
}

/* Elemen magnetik: tertarik ke arah pointer */
export function initMagnetic() {
  if (!motionOK || !finePointer) return;
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    const strength = parseFloat(el.dataset.magnetic || '') || 0.35;
    const xTo = gsap.quickTo(el, 'x', { duration: 0.9, ease: 'elastic.out(1, 0.4)' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.9, ease: 'elastic.out(1, 0.4)' });
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    });
    el.addEventListener('pointerleave', () => {
      xTo(0);
      yTo(0);
    });
  });
}

/* Header: sembunyi saat gulir ke bawah, jam Jakarta, menu layar penuh */
let closeMenu: (() => void) | null = null;

export function initHeader() {
  const hdr = document.querySelector<HTMLElement>('[data-header]');
  if (!hdr) return;

  let lastY = window.scrollY;
  window.addEventListener(
    'scroll',
    () => {
      const y = window.scrollY;
      if (!root.classList.contains('is-menu-open')) hdr.classList.toggle('is-hidden', y > lastY && y > 160);
      lastY = y;
    },
    { passive: true },
  );

  const clock = hdr.querySelector<HTMLElement>('[data-clock]');
  if (clock) {
    const fmt = new Intl.DateTimeFormat('id-ID', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Jakarta' });
    const tick = () => (clock.textContent = fmt.format(new Date()));
    tick();
    setInterval(tick, 15000);
  }

  initMenu();
}

function initMenu() {
  const btn = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const menu = document.querySelector<HTMLElement>('[data-menu]');
  if (!btn || !menu) return;

  const btnLabel = btn.querySelector('.hdr__menu-label');
  let tl: gsap.core.Timeline | null = null;
  if (motionOK) {
    tl = gsap
      .timeline({ paused: true })
      .fromTo(
        menu.querySelector('.menu__bg'),
        { clipPath: 'inset(0% 0% 100% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.9, ease: 'expo.inOut' },
      )
      .fromTo(menu.querySelectorAll('.menu__txt'), { yPercent: 110 }, { yPercent: 0, duration: 0.9, stagger: 0.06, ease: 'expo.out' }, '-=0.35')
      .fromTo(
        menu.querySelectorAll('.menu__num, .menu__aside > *'),
        { autoAlpha: 0, y: 12 },
        { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.03 },
        '-=0.7',
      );
  }

  const set = (open: boolean) => {
    btn.setAttribute('aria-expanded', String(open));
    if (btnLabel) btnLabel.textContent = open ? 'Tutup' : 'Menu';
    menu.inert = !open;
    root.classList.toggle('is-menu-open', open);
    if (open) {
      menu.classList.add('is-open');
      lenis?.stop();
      tl?.timeScale(1).play();
    } else {
      lenis?.start();
      if (tl) {
        tl.timeScale(1.6)
          .reverse()
          .eventCallback('onReverseComplete', () => menu.classList.remove('is-open'));
      } else {
        menu.classList.remove('is-open');
      }
    }
  };

  closeMenu = () => {
    if (root.classList.contains('is-menu-open')) set(false);
  };

  btn.addEventListener('click', () => set(!root.classList.contains('is-menu-open')));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu?.();
  });
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => closeMenu?.()));
}

/* Tautan anchor di halaman yang sama digulir halus lewat Lenis */
export function initAnchors() {
  document.addEventListener('click', (e) => {
    const a = (e.target as Element).closest<HTMLAnchorElement>('a[href*="#"]');
    if (!a) return;
    const url = new URL(a.href, location.href);
    if (url.pathname !== location.pathname || !url.hash) return;
    const target = document.querySelector<HTMLElement>(url.hash);
    if (!target) return;
    e.preventDefault();
    closeMenu?.();
    scrollToTarget(target);
    history.replaceState(null, '', url.hash);
  });

  document.querySelectorAll<HTMLElement>('[data-totop]').forEach((b) => b.addEventListener('click', () => scrollToTarget(0)));
}

/* Formulir sederhana (demo: tidak mengirim ke server). Pesan sukses bisa diatur lewat data-success. */
export function initForm() {
  document.querySelectorAll<HTMLFormElement>('[data-form]').forEach((form) => {
    const status = form.querySelector<HTMLElement>('[data-form-status]')!;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      form.classList.add('was-validated');
      if (!form.checkValidity()) {
        status.textContent = 'Mohon lengkapi kolom yang wajib diisi.';
        form.querySelector<HTMLElement>(':invalid')?.focus();
        return;
      }
      const name = String(new FormData(form).get('nama') || '').trim().split(/\s+/)[0];
      status.textContent =
        form.dataset.success ?? `Terima kasih, ${name}. Ini versi demo — pesan tidak dikirim ke mana pun.`;
      form.reset();
      form.classList.remove('was-validated');
      if (motionOK) gsap.fromTo(status, { y: 10, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6 });
    });
  });
}
