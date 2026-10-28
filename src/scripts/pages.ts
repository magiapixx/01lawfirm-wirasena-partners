import { gsap, ScrollTrigger, SplitText, Flip, motionOK, finePointer, scrollToTarget } from './core';
import { pad } from '../lib/utils';

/* Interaksi halaman indeks: /praktik, /tim, /wawasan, /kontak.
   Fungsi bertanda "fungsional" tetap jalan saat reduced motion; sisanya hanya animasi. */

// --- /praktik ---------------------------------------------------------------

// Grid glyph di hero: muncul berputar, lalu berotasi pelan dengan kecepatan berbeda.
export function initGlyphGrid() {
  const grid = document.querySelector<HTMLElement>('[data-glyph-grid]');
  if (!grid) return;
  const cells = gsap.utils.toArray<HTMLElement>('.glyph-grid__cell', grid);
  const svgs = cells.map((c) => c.querySelector('svg'));
  gsap.from(cells, { scale: 0, rotate: -180, duration: 1.6, stagger: { each: 0.08, from: 'random' }, ease: 'expo.out', delay: 0.3 });
  svgs.forEach((svg, i) => {
    gsap.to(svg, { rotate: i % 2 ? -360 : 360, duration: gsap.utils.random(18, 34), repeat: -1, ease: 'none' });
  });
  gsap.to(grid, {
    yPercent: 25,
    rotate: 8,
    ease: 'none',
    scrollTrigger: { trigger: grid.closest('section'), start: 'top top', end: 'bottom top', scrub: true },
  });
}

// Panel kiri sticky: angka & judul berputar seperti reel, glyph berganti, blok aktif menyala.
export function initPracticeIndex() {
  const root = document.querySelector<HTMLElement>('[data-pindex]');
  if (!root) return;
  const blocks = gsap.utils.toArray<HTMLElement>('[data-pblock]', root);
  const reels = gsap.utils.toArray<HTMLElement>('[data-reel]', root);
  const glyphs = gsap.utils.toArray<HTMLElement>('[data-pindex-glyph]', root);
  const dots = gsap.utils.toArray<HTMLElement>('[data-pindex-dot]', root);
  const n = blocks.length;
  let current = 0;

  gsap.set(glyphs, { autoAlpha: 0, scale: 0.6, rotate: -90 });
  gsap.set(glyphs[0], { autoAlpha: 1, scale: 1, rotate: 0 });

  const setActive = (i: number) => {
    if (i === current) return;
    const prev = current;
    current = i;
    gsap.to(reels, { yPercent: (-100 / n) * i, duration: 0.9, ease: 'expo.inOut', overwrite: true });
    gsap.to(glyphs[prev], { autoAlpha: 0, scale: 0.6, rotate: 90, duration: 0.6, ease: 'expo.in', overwrite: true });
    gsap.fromTo(
      glyphs[i],
      { autoAlpha: 0, scale: 0.6, rotate: -90 },
      { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.9, ease: 'expo.out', delay: 0.25, overwrite: true },
    );
    blocks.forEach((b, j) => b.classList.toggle('is-active', j === i));
    dots.forEach((d, j) => d.classList.toggle('is-active', j === i));
  };

  blocks.forEach((b, i) =>
    ScrollTrigger.create({ trigger: b, start: 'top 55%', end: 'bottom 55%', onToggle: (self) => self.isActive && setActive(i) }),
  );
  dots.forEach((d, i) => d.addEventListener('click', () => scrollToTarget(blocks[i])));
}

// --- /tim ---------------------------------------------------------------------

// Kipas potret di hero: masuk bertahap, bergerak berlapis mengikuti pointer & scroll.
export function initFan() {
  const fan = document.querySelector<HTMLElement>('[data-fan]');
  if (!fan) return;
  const slots = gsap.utils.toArray<HTMLElement>('.fan__slot', fan);
  const cards = gsap.utils.toArray<HTMLElement>('.fan__card', fan);

  gsap.from(slots, { yPercent: 90, rotate: 0, autoAlpha: 0, duration: 1.6, stagger: 0.12, ease: 'expo.out', delay: 0.35 });
  gsap.to(cards, {
    yPercent: (i) => -12 - i * 10,
    ease: 'none',
    scrollTrigger: { trigger: fan.closest('section'), start: 'top top', end: 'bottom top', scrub: true },
  });

  if (!finePointer) return;
  const movers = cards.map((c, i) => ({
    x: gsap.quickTo(c, 'x', { duration: 1.1, ease: 'power3' }),
    y: gsap.quickTo(c, 'y', { duration: 1.1, ease: 'power3' }),
    depth: 14 + i * 14,
  }));
  window.addEventListener('pointermove', (e) => {
    const nx = e.clientX / window.innerWidth - 0.5;
    const ny = e.clientY / window.innerHeight - 0.5;
    movers.forEach((m) => {
      m.x(nx * m.depth);
      m.y(ny * m.depth);
    });
  });
}

// Kartu miring 3D + kilau mengikuti pointer.
export function initTilt() {
  if (!finePointer) return;
  document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((el) => {
    gsap.set(el, { transformPerspective: 900 });
    const rx = gsap.quickTo(el, 'rotationX', { duration: 0.6, ease: 'power3' });
    const ry = gsap.quickTo(el, 'rotationY', { duration: 0.6, ease: 'power3' });
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      ry((px - 0.5) * 16);
      rx((0.5 - py) * 16);
      el.style.setProperty('--gx', `${px * 100}%`);
      el.style.setProperty('--gy', `${py * 100}%`);
    });
    el.addEventListener('pointerleave', () => {
      rx(0);
      ry(0);
    });
  });
}

// --- Filter, pencarian & mode tampilan (fungsional) ------------------------

export function initFilters() {
  document.querySelectorAll<HTMLElement>('[data-filter-scope]').forEach((scope) => {
    const items = gsap.utils.toArray<HTMLElement>('[data-filter-item]', scope);
    const grid = scope.querySelector<HTMLElement>('[data-filter-grid]')!;
    const count = scope.querySelector<HTMLElement>('[data-filter-count]');
    const empty = scope.querySelector<HTMLElement>('[data-filter-empty]');
    const search = scope.querySelector<HTMLInputElement>('[data-filter-search]');
    const state: Record<string, string> = {};
    let query = '';

    const matches = (el: HTMLElement) =>
      Object.entries(state).every(([key, val]) => val === 'all' || (el.dataset[key] || '').split(' ').includes(val)) &&
      (!query || (el.dataset.search || '').includes(query));

    // Tinggi grid dianimasikan dari lama ke baru; tanpa ini grid kolaps saat item dibuat absolute oleh Flip.
    const tweenHeight = (from: number) => {
      const to = grid.offsetHeight;
      if (from !== to) gsap.fromTo(grid, { height: from }, { height: to, duration: 0.75, ease: 'expo.inOut', clearProps: 'height' });
    };

    const apply = () => {
      const flipState = motionOK ? Flip.getState(items) : null;
      const h0 = grid.offsetHeight;
      let shown = 0;
      items.forEach((el) => {
        const ok = matches(el);
        // Inline display (bukan atribut hidden) agar Flip bisa menganimasikan elemen yang keluar.
        el.style.display = ok ? '' : 'none';
        if (ok) shown++;
      });
      if (count) count.textContent = String(shown);
      if (empty) empty.hidden = shown > 0;

      if (!flipState) return ScrollTrigger.refresh();
      tweenHeight(h0);
      Flip.from(flipState, {
        duration: 0.75,
        ease: 'expo.inOut',
        absolute: true,
        scale: true,
        onEnter: (els) => gsap.fromTo(els, { autoAlpha: 0, scale: 0.85 }, { autoAlpha: 1, scale: 1, duration: 0.6, delay: 0.25 }),
        onLeave: (els) => gsap.to(els, { autoAlpha: 0, scale: 0.85, duration: 0.4 }),
        onComplete: () => ScrollTrigger.refresh(),
      });
    };

    scope.querySelectorAll<HTMLElement>('[data-filter-group]').forEach((group) => {
      const key = group.dataset.filterGroup!;
      state[key] = 'all';
      if (group instanceof HTMLSelectElement) {
        group.addEventListener('change', () => {
          state[key] = group.value;
          apply();
        });
        return;
      }
      const buttons = group.querySelectorAll<HTMLButtonElement>('[data-filter-value]');
      buttons.forEach((b) =>
        b.addEventListener('click', () => {
          buttons.forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
          state[key] = b.dataset.filterValue!;
          apply();
        }),
      );
    });

    let typing: number | undefined;
    search?.addEventListener('input', () => {
      clearTimeout(typing);
      typing = window.setTimeout(() => {
        query = search.value.trim().toLowerCase();
        apply();
      }, 180);
    });

    // Grid <-> daftar, kartu & sampul bertransformasi dengan Flip.
    const viewBtns = scope.querySelectorAll<HTMLButtonElement>('[data-view]');
    viewBtns.forEach((b) =>
      b.addEventListener('click', () => {
        const list = b.dataset.view === 'list';
        if (grid.classList.contains('is-list') === list) return;
        viewBtns.forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
        const st = motionOK ? Flip.getState(scope.querySelectorAll('[data-filter-item], [data-flip-cover]')) : null;
        const h0 = grid.offsetHeight;
        grid.classList.toggle('is-list', list);
        if (!st) return ScrollTrigger.refresh();
        tweenHeight(h0);
        Flip.from(st, { duration: 0.8, ease: 'expo.inOut', nested: true, onComplete: () => ScrollTrigger.refresh() });
      }),
    );
  });
}

// --- /kontak ------------------------------------------------------------------

// Huruf "Mari bicara." menyingkir dari kursor.
export function initRepel() {
  const el = document.querySelector<HTMLElement>('[data-repel]');
  if (!el) return;
  const split = SplitText.create(el.querySelectorAll('[data-repel-line]'), { type: 'chars', charsClass: 'kchar' });
  const chars = split.chars as HTMLElement[];
  gsap.set(el, { visibility: 'visible' });

  gsap.from(chars, {
    yPercent: 110,
    rotate: 12,
    autoAlpha: 0,
    duration: 1.4,
    stagger: 0.045,
    ease: 'expo.out',
    delay: 0.15,
    onComplete: () => finePointer && startRepel(),
  });

  function startRepel() {
    const section = el!.closest('section')!;
    const R = 280;
    const movers = chars.map((c) => ({
      c,
      x: gsap.quickTo(c, 'x', { duration: 0.9, ease: 'power3' }),
      y: gsap.quickTo(c, 'y', { duration: 0.9, ease: 'power3' }),
      r: gsap.quickTo(c, 'rotation', { duration: 0.9, ease: 'power3' }),
    }));

    section.addEventListener('pointermove', (e) => {
      movers.forEach((m) => {
        const rect = m.c.getBoundingClientRect();
        // Pusat huruf tanpa pergeseran saat ini, agar tidak terjadi umpan balik.
        const cx = rect.left + rect.width / 2 - Number(gsap.getProperty(m.c, 'x'));
        const cy = rect.top + rect.height / 2 - Number(gsap.getProperty(m.c, 'y'));
        const dx = cx - e.clientX;
        const dy = cy - e.clientY;
        const d = Math.hypot(dx, dy) || 1;
        const f = Math.max(0, 1 - d / R);
        m.x((dx / d) * f * 70);
        m.y((dy / d) * f * 70);
        m.r((dx / d) * f * 16);
      });
    });
    section.addEventListener('pointerleave', () =>
      movers.forEach((m) => {
        m.x(0);
        m.y(0);
        m.r(0);
      }),
    );
  }
}

// Tab kantor + jam lokal + status buka (fungsional).
export function initOffices() {
  const root = document.querySelector<HTMLElement>('[data-offices]');
  if (!root) return;
  const tabs = [...root.querySelectorAll<HTMLButtonElement>('[role="tab"]')];
  const panels = [...root.querySelectorAll<HTMLElement>('[role="tabpanel"]')];
  const markers = [...root.querySelectorAll<HTMLElement>('[data-marker]')];
  const cities = panels.map((p) =>
    motionOK ? SplitText.create(p.querySelector('[data-city]'), { type: 'lines,chars', mask: 'lines' }) : null,
  );
  let current = 0;

  const show = (i: number) => {
    if (i === current) return;
    const prev = panels[current];
    const next = panels[i];
    tabs.forEach((t, j) => {
      t.setAttribute('aria-selected', String(j === i));
      t.tabIndex = j === i ? 0 : -1;
    });
    markers.forEach((m, j) => m.classList.toggle('is-active', j === i));
    panels.forEach((p, j) => (p.inert = j !== i));
    next.classList.add('is-active');

    if (motionOK) {
      // overwrite: true membunuh tween lama, jadi klik cepat tidak menyembunyikan panel yang aktif.
      gsap.to(prev, {
        autoAlpha: 0,
        y: -24,
        duration: 0.45,
        ease: 'power3.in',
        overwrite: true,
        onComplete: () => prev.classList.remove('is-active'),
      });
      gsap.fromTo(next, { autoAlpha: 0, y: 0 }, { autoAlpha: 1, duration: 0.01, delay: 0.4, overwrite: true });
      const chars = cities[i]?.chars;
      if (chars) gsap.fromTo(chars, { yPercent: 110 }, { yPercent: 0, duration: 1, stagger: 0.035, ease: 'expo.out', delay: 0.4 });
      gsap.fromTo(next.querySelector('.opanel__info'), { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9, ease: 'expo.out', delay: 0.55 });
    } else {
      prev.classList.remove('is-active');
    }
    current = i;
  };

  tabs.forEach((t, i) => {
    t.addEventListener('click', () => show(i));
    t.addEventListener('keydown', (e) => {
      const dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (!dir) return;
      const j = (i + dir + tabs.length) % tabs.length;
      tabs[j].focus();
      show(j);
    });
  });
  markers.forEach((m, i) => m.addEventListener('click', () => show(i)));

  const clocks = root.querySelectorAll<HTMLElement>('[data-tz]');
  const tick = () => {
    const now = new Date();
    clocks.forEach((c) => {
      const tz = c.dataset.tz!;
      c.querySelector('[data-clock-time]')!.textContent = new Intl.DateTimeFormat('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: tz,
      }).format(now);
      const parts = new Intl.DateTimeFormat('en-US', { weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: false, timeZone: tz }).formatToParts(now);
      const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
      const mins = (Number(get('hour')) % 24) * 60 + Number(get('minute'));
      const open = !['Sat', 'Sun'].includes(get('weekday')) && mins >= 8 * 60 + 30 && mins < 18 * 60;
      c.classList.toggle('is-open', open);
      c.querySelector('[data-clock-status]')!.textContent = open ? 'Buka sekarang' : 'Sedang tutup';
    });
  };
  tick();
  setInterval(tick, 1000);
}

// Formulir tiga langkah (fungsional; animasi bila motion aktif). Demo: tidak mengirim ke server.
export function initStepForm() {
  const form = document.querySelector<HTMLFormElement>('[data-stepform]');
  if (!form) return;
  const steps = [...form.querySelectorAll<HTMLElement>('[data-step]')];
  const labels = document.querySelectorAll<HTMLElement>('[data-step-label]');
  const bar = form.querySelector<HTMLElement>('[data-step-bar]');
  const counter = form.querySelector<HTMLElement>('[data-step-count]');
  const status = form.querySelector<HTMLElement>('[data-step-status]')!;
  const prevBtn = form.querySelector<HTMLButtonElement>('[data-step-prev]')!;
  const nextBtn = form.querySelector<HTMLButtonElement>('[data-step-next]')!;
  const submitBtn = form.querySelector<HTMLButtonElement>('[data-step-submit]')!;
  const done = document.querySelector<HTMLElement>('[data-step-done]')!;
  const summary = done.querySelector<HTMLElement>('[data-step-summary]')!;
  const last = steps.length - 1;
  let i = 0;

  const render = (from?: number) => {
    steps.forEach((s, j) => (s.hidden = j !== i));
    prevBtn.hidden = i === 0;
    nextBtn.hidden = i === last;
    submitBtn.hidden = i !== last;
    labels.forEach((l, j) => {
      l.classList.toggle('is-active', j === i);
      l.classList.toggle('is-done', j < i);
    });
    if (counter) counter.textContent = `${pad(i + 1)} / ${pad(steps.length)}`;
    const progress = (i + 1) / steps.length;
    if (bar) gsap.to(bar, { scaleX: progress, duration: motionOK ? 0.8 : 0, ease: 'expo.out' });

    if (motionOK && from !== undefined) {
      const dir = i > from ? 1 : -1;
      gsap.fromTo(steps[i], { x: 60 * dir, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.8, ease: 'expo.out' });
      gsap.from(steps[i].querySelectorAll('.choice, .field, .pills, .cform__consent'), {
        y: 24,
        autoAlpha: 0,
        stagger: 0.04,
        duration: 0.7,
        ease: 'expo.out',
        delay: 0.1,
      });
    }
    ScrollTrigger.refresh();
  };

  const validStep = () => {
    const step = steps[i];
    const invalid = [...step.querySelectorAll<HTMLInputElement>('input, select, textarea')].find((f) => !f.checkValidity());
    step.classList.toggle('was-validated', !!invalid);
    if (!invalid) {
      status.textContent = '';
      return true;
    }
    status.textContent = i === 0 ? 'Pilih salah satu bidang terlebih dahulu.' : 'Mohon lengkapi kolom yang wajib diisi.';
    invalid.focus();
    return false;
  };

  const go = (to: number) => {
    const from = i;
    i = to;
    render(from);
  };

  nextBtn.addEventListener('click', () => validStep() && go(i + 1));
  prevBtn.addEventListener('click', () => go(i - 1));

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validStep()) return;
    // Enter di langkah awal berarti "lanjut", bukan kirim.
    if (i < last) return go(i + 1);

    const data = new FormData(form);
    const name = String(data.get('nama') || '').trim().split(/\s+/)[0];
    summary.textContent = `${name}, permintaan Anda untuk bidang ${data.get('bidang')} sudah kami catat. Kami akan menghubungi Anda via ${data.get('via')}. Ini versi demo — tidak ada data yang dikirim.`;
    form.hidden = true;
    done.hidden = false;
    if (motionOK) {
      gsap.fromTo(done, { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, ease: 'expo.out' });
      gsap.fromTo(done.querySelectorAll('[pathLength]'), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1, stagger: 0.3, ease: 'power2.inOut', delay: 0.2 });
    }
    ScrollTrigger.refresh();
  });

  done.querySelector('[data-step-reset]')?.addEventListener('click', () => {
    form.reset();
    steps.forEach((s) => s.classList.remove('was-validated'));
    done.hidden = true;
    form.hidden = false;
    go(0);
  });

  render();
}

// Akordeon FAQ di atas <details> (tetap jalan tanpa JS; JS menambah animasi tinggi).
export function initAccordions() {
  if (!motionOK) return;
  document.querySelectorAll<HTMLDetailsElement>('[data-accordion] details').forEach((d) => {
    const summary = d.querySelector('summary')!;
    const content = d.querySelector<HTMLElement>('.faq__content')!;
    summary.addEventListener('click', (e) => {
      e.preventDefault();
      if (d.classList.contains('is-open')) {
        d.classList.remove('is-open');
        gsap.to(content, {
          height: 0,
          duration: 0.5,
          ease: 'expo.inOut',
          overwrite: true,
          onComplete: () => {
            d.open = false;
            gsap.set(content, { clearProps: 'height' });
            ScrollTrigger.refresh();
          },
        });
      } else {
        d.open = true;
        d.classList.add('is-open');
        gsap.fromTo(content, { height: 0 }, { height: 'auto', duration: 0.6, ease: 'expo.inOut', overwrite: true, onComplete: () => ScrollTrigger.refresh() });
      }
    });
  });
}
