// ============================================================
// Главный файл: темы, акцентный цвет, тосты, интерактив, a11y.
// ============================================================

import { revenue, deals, segments, kpiSummary } from './data.js';
import {
  renderKpiGrid,
  renderRevenueBars,
  renderRevenueTableBody,
  renderRevenueCards,
  renderFunnelList,
  renderSegmentsGrid,
  renderModalContent
} from './renderer.js';

/* ---------- Утилиты ---------- */
function $(sel, root = document) { return root.querySelector(sel); }
function $all(sel, root = document) { return Array.from(root.querySelectorAll(sel)); }
function mount(selector, element) {
  const container = $(selector);
  if (!container) return;
  container.replaceChildren(element);
}

/* ============================================================
   4.2 / 4.3 / 4.4 — ТЕМА, АКЦЕНТ, СИСТЕМНЫЕ НАСТРОЙКИ
   ============================================================ */

const STORAGE = {
  theme: 'finbi-theme',
  accent: 'finbi-accent',
  themeManual: 'finbi-theme-manual'
};

function hexToRgb(hex) {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return m ? `${parseInt(m[1],16)},${parseInt(m[2],16)},${parseInt(m[3],16)}` : null;
}

function shade(hex, percent) {
  // percent > 0 — светлее, < 0 — темнее
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!m) return hex;
  const f = (v) => {
    const n = parseInt(v, 16);
    const val = percent > 0
      ? Math.round(n + (255 - n) * percent / 100)
      : Math.round(n * (100 + percent) / 100);
    return Math.max(0, Math.min(255, val)).toString(16).padStart(2, '0');
  };
  return `#${f(m[1])}${f(m[2])}${f(m[3])}`;
}

function applyTheme(theme, { manual = true } = {}) {
  document.documentElement.setAttribute('data-theme', theme);

  // Подсветка активной кнопки
  $all('[data-theme-set]').forEach(btn => {
    const active = btn.dataset.themeSet === theme;
    btn.classList.toggle('is-active', active);
    btn.setAttribute('aria-pressed', String(active));
  });

  try {
    localStorage.setItem(STORAGE.theme, theme);
    if (manual) localStorage.setItem(STORAGE.themeManual, '1');
    else localStorage.removeItem(STORAGE.themeManual);
  } catch (e) {}

  // Уведомление
  const themeNames = { light: 'Светлая тема', dark: 'Тёмная тема', hc: 'Высокий контраст' };
  showToast(`Тема: ${themeNames[theme] || theme}`, 'info', 1800);
}

function applyAccent(hex) {
  const rgb = hexToRgb(hex);
  if (!rgb) return;
  const root = document.documentElement;
  root.style.setProperty('--accent', hex);
  root.style.setProperty('--accent-rgb', rgb);
  root.style.setProperty('--accent-hover', shade(hex, 18));
  root.style.setProperty('--accent-active', shade(hex, -18));

  // Обновляем цвет color-picker
  const picker = $('#accent-color');
  if (picker) picker.value = hex;

  try { localStorage.setItem(STORAGE.accent, hex); } catch (e) {}
}

function initThemeControls() {
  const picker = $('#accent-color');
  const savedAccent = (() => { try { return localStorage.getItem(STORAGE.accent); } catch(e) { return null; } })();
  if (savedAccent && picker) {
    picker.value = savedAccent;
  }
  if (picker) {
    picker.addEventListener('input', e => applyAccent(e.target.value));
  }

  $all('[data-theme-set]').forEach(btn => {
    btn.addEventListener('click', () => applyTheme(btn.dataset.themeSet, { manual: true }));
  });

  // 4.4. Слежение за системной темой, если пользователь не задал вручную
  const mql = window.matchMedia('(prefers-color-scheme: light)');
  const onChange = (e) => {
    let manual = false;
    try { manual = localStorage.getItem(STORAGE.themeManual) === '1'; } catch (err) {}
    if (manual) return;
    const theme = e.matches ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    $all('[data-theme-set]').forEach(btn => {
      const active = btn.dataset.themeSet === theme;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', String(active));
    });
  };
  if (mql.addEventListener) mql.addEventListener('change', onChange);
  else mql.addListener(onChange);

  // Инициализируем подсветку активной кнопки из текущей темы
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  $all('[data-theme-set]').forEach(btn => {
    const active = btn.dataset.themeSet === current;
    btn.classList.toggle('is-active', active);
    btn.setAttribute('aria-pressed', String(active));
  });
}

/* ============================================================
   5.1 — TOAST
   ============================================================ */

function showToast(message, type = 'info', duration = 3500) {
  const stack = $('#toast-stack');
  if (!stack) return;

  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.setAttribute('role', 'status');

  const text = document.createElement('span');
  text.textContent = message;

  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'toast__close';
  close.setAttribute('aria-label', 'Закрыть уведомление');
  close.innerHTML = '&times;';

  toast.append(text, close);
  stack.append(toast);

  const remove = () => {
    toast.classList.add('is-leaving');
    toast.addEventListener('animationend', () => toast.remove(), { once: true });
    setTimeout(() => toast.remove(), 400);
  };
  close.addEventListener('click', remove);
  if (duration > 0) setTimeout(remove, duration);
}

/* ============================================================
   МОБИЛЬНОЕ МЕНЮ
   ============================================================ */
const navState = {
  sidebar: null, overlay: null, burger: null, closeBtn: null,
  isOpen: false, lastFocused: null
};

function initMobileNav() {
  navState.sidebar  = $('#sidebar');
  navState.overlay  = $('#nav-overlay');
  navState.burger   = $('#burger');
  navState.closeBtn = $('#sidebar-close');
  if (!navState.sidebar || !navState.burger) return;

  navState.burger.addEventListener('click', () => navState.isOpen ? closeNav() : openNav());
  if (navState.overlay) navState.overlay.addEventListener('click', closeNav);
  if (navState.closeBtn) navState.closeBtn.addEventListener('click', closeNav);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && navState.isOpen) { e.preventDefault(); closeNav(); }
  });

  $all('a', navState.sidebar).forEach(a => {
    a.addEventListener('click', () => {
      if (window.matchMedia('(max-width: 1023px)').matches) closeNav();
    });
  });

  const mq = window.matchMedia('(min-width: 1024px)');
  mq.addEventListener('change', e => { if (e.matches && navState.isOpen) closeNav(); });
}

function openNav() {
  if (navState.isOpen) return;
  navState.lastFocused = document.activeElement;
  navState.sidebar.classList.add('is-open');
  navState.burger.classList.add('is-active');
  navState.burger.setAttribute('aria-expanded', 'true');
  navState.burger.setAttribute('aria-label', 'Закрыть меню');
  if (navState.overlay) {
    navState.overlay.hidden = false;
    requestAnimationFrame(() => navState.overlay.classList.add('is-visible'));
  }
  document.body.classList.add('nav-open');
  navState.isOpen = true;
  (navState.closeBtn || $('a', navState.sidebar))?.focus();
}

function closeNav() {
  if (!navState.isOpen) return;
  navState.sidebar.classList.remove('is-open');
  navState.burger.classList.remove('is-active');
  navState.burger.setAttribute('aria-expanded', 'false');
  navState.burger.setAttribute('aria-label', 'Открыть меню');
  if (navState.overlay) {
    navState.overlay.classList.remove('is-visible');
    setTimeout(() => { navState.overlay.hidden = true; }, 300);
  }
  document.body.classList.remove('nav-open');
  navState.isOpen = false;
  navState.lastFocused?.focus?.();
}

/* ============================================================
   МОДАЛЬНОЕ ОКНО (focus trap)
   ============================================================ */
const modalState = { el: null, body: null, title: null, lastFocused: null, isOpen: false };

function initModal() {
  modalState.el    = $('#modal');
  modalState.body  = $('#modal-body');
  modalState.title = $('#modal-title');
  if (!modalState.el) return;

  modalState.el.addEventListener('click', e => {
    if (e.target === modalState.el) closeModal();
  });
  $all('[data-modal-close]', modalState.el).forEach(btn => btn.addEventListener('click', closeModal));
  $('.modal-close', modalState.el)?.addEventListener('click', closeModal);

  document.addEventListener('keydown', e => {
    if (!modalState.isOpen) return;
    if (e.key === 'Escape') { e.preventDefault(); closeModal(); return; }
    if (e.key === 'Tab') trapFocus(e);
  });
}

function trapFocus(e) {
  const focusables = $all(
    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
    modalState.el
  ).filter(el => el.offsetParent !== null || el === document.activeElement);
  if (!focusables.length) return;
  const first = focusables[0];
  const last  = focusables[focusables.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
}

function openModal(item) {
  if (!modalState.el) return;
  modalState.lastFocused = document.activeElement;
  modalState.title.textContent = item.title || 'Детали';
  modalState.body.replaceChildren(renderModalContent(item));
  modalState.el.hidden = false;
  document.body.classList.add('modal-open');
  modalState.isOpen = true;
  const focusables = $all(
    'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    modalState.el
  );
  (focusables[0] || modalState.el).focus();
}

function closeModal() {
  if (!modalState.isOpen) return;
  modalState.el.hidden = true;
  document.body.classList.remove('modal-open');
  modalState.isOpen = false;
  modalState.lastFocused?.focus?.();
}

/* ============================================================
   ФИЛЬТРЫ, СОРТИРОВКА, ПУСТОЕ СОСТОЯНИЕ
   ============================================================ */
const state = {
  query: '', channel: '', statuses: new Set(['confirmed']),
  view: 'table', sortKey: null, sortDir: 'asc'
};

function readFiltersFromForm(form) {
  if (!form) return;
  const data = new FormData(form);
  state.query = String(data.get('query') || '').toLowerCase().trim();
  state.channel = String(data.get('channel') || '');
  state.statuses = new Set($all('input[name="status"]:checked', form).map(cb => cb.value));
  state.view = String(data.get('view') || 'table');
}

function applyFilters(items) {
  return items.filter(item => {
    if (state.query && !item.title.toLowerCase().includes(state.query)) return false;
    if (state.channel && item.channel !== state.channel) return false;
    if (state.statuses.size > 0 && !state.statuses.has(item.status)) return false;
    return true;
  });
}

function applySort(items) {
  if (!state.sortKey) return items;
  const { sortKey, sortDir } = state;
  const sorted = [...items].sort((a, b) => {
    const av = a[sortKey], bv = b[sortKey];
    if (typeof av === 'number' && typeof bv === 'number') return av - bv;
    return String(av).localeCompare(String(bv), 'ru');
  });
  return sortDir === 'desc' ? sorted.reverse() : sorted;
}

function renderRevenue(filtered) {
  const tableBody = renderRevenueTableBody(filtered, openModal);
  const existingTbody = $('#revenue-table-body');
  if (existingTbody) existingTbody.replaceWith(tableBody);

  const cards = renderRevenueCards(filtered, openModal);
  const existingCards = $('#revenue-cards');
  if (existingCards) existingCards.replaceWith(cards);

  const table   = $('#revenue-table');
  const cardsEl = $('#revenue-cards');
  const empty   = $('#revenue-empty');
  const tableWrap = $('.table-wrap');

  const isEmpty = filtered.length === 0;

  if (empty) empty.hidden = !isEmpty;
  if (table) table.hidden = state.view !== 'table' || isEmpty;
  if (cardsEl) cardsEl.hidden = state.view !== 'cards' || isEmpty;
  if (tableWrap) tableWrap.hidden = state.view !== 'table' || isEmpty;
}

function initFilters() {
  const form = $('#filters-form');
  if (!form) return;
  form.addEventListener('input', () => {
    readFiltersFromForm(form);
    renderRevenue(applySort(applyFilters(revenue)));
  });
  form.addEventListener('reset', () => {
    requestAnimationFrame(() => {
      readFiltersFromForm(form);
      state.sortKey = null;
      state.sortDir = 'asc';
      $all('.sort-btn').forEach(b => b.removeAttribute('data-direction'));
      renderRevenue(applySort(applyFilters(revenue)));
      showToast('Фильтры сброшены', 'info', 1800);
    });
  });

  // Кнопка сброса в пустом состоянии
  $('#reset-filters')?.addEventListener('click', () => {
    form.reset();
  });
}

function initSorting() {
  $all('.sort-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.sort;
      if (state.sortKey === key) state.sortDir = state.sortDir === 'asc' ? 'desc' : 'asc';
      else { state.sortKey = key; state.sortDir = 'asc'; }
      $all('.sort-btn').forEach(b => {
        b.removeAttribute('data-direction');
        b.setAttribute('aria-sort', 'none');
      });
      btn.dataset.direction = state.sortDir;
      btn.setAttribute('aria-sort', state.sortDir === 'asc' ? 'ascending' : 'descending');
      renderRevenue(applySort(applyFilters(revenue)));
    });
  });
}

/* ============================================================
   ИНИЦИАЛИЗАЦИЯ + СИМУЛЯЦИЯ ЗАГРУЗКИ (5.4)
   ============================================================ */

function init() {
  initThemeControls();
  initMobileNav();
  initModal();
  initFilters();
  initSorting();

  // Симулируем загрузку данных
  setTimeout(() => {
    mount('#kpi-grid', renderKpiGrid(kpiSummary));
    mount('#revenue-bars', renderRevenueBars(revenue));
    mount('#funnel-list', renderFunnelList(deals, openModal));
    mount('#segments-grid', renderSegmentsGrid(segments, openModal));

    readFiltersFromForm($('#filters-form'));
    renderRevenue(applySort(applyFilters(revenue)));

    // Обновляем aria-busy
    $('#kpi-grid')?.setAttribute('aria-busy', 'false');
    $('#revenue-bars')?.setAttribute('aria-busy', 'false');

    showToast('Данные загружены', 'success', 2200);
  }, 600);
}

document.addEventListener('DOMContentLoaded', init);