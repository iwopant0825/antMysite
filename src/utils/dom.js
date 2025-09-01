export function safeFocus(el) {
  if (!el) return;
  try {
    el.focus({ preventScroll: true });
    return;
  } catch (_) {}
  try {
    el.setAttribute('tabindex', '-1');
    el.focus({ preventScroll: true });
  } catch (_) {}
}

export function observeOnce(el, callback, options) {
  if (!('IntersectionObserver' in window)) {
    // Fallback: microtask로 호출
    const t = setTimeout(() => callback(), 0);
    return () => clearTimeout(t);
  }
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        try { callback(e); } finally { io.disconnect(); }
        break;
      }
    }
  }, options);
  if (el) io.observe(el);
  return () => io.disconnect();
}


