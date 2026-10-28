import { initLenis, motionOK, ScrollTrigger, scrollToTarget, lenis } from './core';
import { runPreloader } from './preloader';
import { initCursor, initMagnetic, initHeader, initAnchors, initForm } from './ui';
import { initSplits, initReveals, initWords, initParallax, initCounters, initDraw, initClips } from './reveals';
import {
  heroIntro,
  heroScroll,
  initMarquee,
  initHScroll,
  initStack,
  initTeam,
  initContact,
  initFooter,
  initReadbar,
} from './sections';
import {
  initGlyphGrid,
  initPracticeIndex,
  initFan,
  initTilt,
  initFilters,
  initRepel,
  initOffices,
  initStepForm,
  initAccordions,
} from './pages';

async function boot() {
  // Fungsi dasar tetap jalan walau reduced motion aktif.
  initHeader();
  initAnchors();
  initForm();
  initFilters();
  initOffices();
  initStepForm();
  initAccordions();
  if (!motionOK) return;

  initLenis();
  initCursor();
  initMagnetic();

  await document.fonts.ready;
  const preloaderDone = runPreloader();

  // ScrollTrigger dibuat sesuai urutan di halaman: yang ada sesudah pin dibuat sesudah pin.
  heroScroll();
  initMarquee();
  initDraw();
  initWords();
  initCounters();
  initHScroll();
  initStack();
  initParallax();
  initTeam();
  initContact();
  initFooter();
  initReadbar();
  initGlyphGrid();
  initPracticeIndex();
  initFan();
  initTilt();
  initRepel();
  initSplits();
  initReveals();
  initClips();

  ScrollTrigger.sort();
  ScrollTrigger.refresh();

  // Datang dari halaman lain ke /#bagian: posisi bergeser setelah pin dibuat, jadi lompat ulang.
  if (location.hash) {
    const target = document.querySelector<HTMLElement>(location.hash);
    if (target) lenis ? lenis.scrollTo(target, { immediate: true, force: true }) : scrollToTarget(target);
  }

  await preloaderDone;
  heroIntro();
}

boot();
