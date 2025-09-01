export function getDeviceByWidth(width) {
  if (width <= 700) return 'mobile';
  if (width <= 1100) return 'tablet';
  return 'desktop';
}

export function onResize(callback) {
  const handler = () => callback(window.innerWidth || 1200);
  window.addEventListener('resize', handler, { passive: true });
  return () => window.removeEventListener('resize', handler);
}


