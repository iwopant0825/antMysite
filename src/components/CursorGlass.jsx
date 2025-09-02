import styled from "styled-components";
import { useEffect, useRef, useState } from "react";

export default function CursorGlass() {
  const wrapRef = useRef(null);
  const blobRef = useRef(null);
  const rafRef = useRef(0);
  const posRef = useRef({ x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0 });
  const targetRef = useRef({ x: posRef.current.x, y: posRef.current.y });
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // disable on coarse pointer devices
    let coarse = false;
    if (window.matchMedia) {
      const mql = window.matchMedia('(pointer: coarse)');
      coarse = !!mql.matches;
      const onChange = () => setEnabled(!mql.matches);
      if (mql.addEventListener) mql.addEventListener('change', onChange);
      else if (mql.addListener) mql.addListener(onChange);
      return () => {
        if (mql.removeEventListener) mql.removeEventListener('change', onChange);
        else if (mql.removeListener) mql.removeListener(onChange);
      };
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // reduced motion respects still movement but snaps faster
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const onMove = (e) => {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;
      ensure();
    };
    const onLeave = () => {
      // fade out when leaving viewport
      if (blobRef.current) blobRef.current.style.opacity = '0';
    };
    const onEnter = () => {
      if (blobRef.current) blobRef.current.style.opacity = '1';
    };

    const step = () => {
      const node = blobRef.current;
      if (!node) { rafRef.current = 0; return; }
      const k = reduce ? 0.35 : 0.18;
      posRef.current.x += (targetRef.current.x - posRef.current.x) * k;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * k;
      node.style.transform = `translate3d(${Math.round(posRef.current.x - 25)}px, ${Math.round(posRef.current.y - 25)}px, 0)`;
      rafRef.current = requestAnimationFrame(step);
    };
    const ensure = () => {
      if (!rafRef.current) rafRef.current = requestAnimationFrame(step);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseleave', onLeave, { passive: true });
    window.addEventListener('mouseenter', onEnter, { passive: true });
    ensure();
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('mouseenter', onEnter);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    };
  }, []);

  if (!enabled) return null;
  return (
    <Wrap ref={wrapRef} aria-hidden="true">
      <Blob ref={blobRef} />
    </Wrap>
  );
}

const Wrap = styled.div`
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 2500; /* below header (3000) */
`;

const Blob = styled.div`
  position: absolute;
  width:50px;
  height:50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.22);
  box-shadow: 0 8px 30px rgba(0,0,0,0.12), inset 0 1px rgba(255,255,255,0.3);
  backdrop-filter: blur(14px) saturate(140%);
  -webkit-backdrop-filter: blur(14px) saturate(140%);
  mix-blend-mode: soft-light;
  will-change: transform, opacity;
  transition: opacity .25s ease;
`;


