import styled, { css, keyframes } from "styled-components";
import { useState } from "react";
import LogoSvg from "/Logo.svg";

export default function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const onNavClick = (e) => {
    const href = e.currentTarget.getAttribute("href");
    if (!href || href.charAt(0) !== "#") return;
    e.preventDefault();
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (!el) {
      close();
      return;
    }

    // URL 해시 동기화 (기본 링크 동작은 막은 상태)
    if (window.history && window.history.pushState) {
      window.history.pushState(null, "", href);
    } else {
      window.location.hash = href;
    }

    // 목표 좌표 계산 (섹션의 scroll-margin-top 보정 반영)
    const rect = el.getBoundingClientRect();
    const current = window.scrollY || document.documentElement.scrollTop || 0;
    let offset = 0;
    try {
      const smt = window.getComputedStyle(el).scrollMarginTop;
      if (smt) offset = parseFloat(smt) || 0;
    } catch (_) {}
    const target = current + rect.top - offset;

    // 접근성 설정 및 기능 지원 분기
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canNativeSmooth = "scrollBehavior" in document.documentElement.style;

    const focusLater = () => {
      try {
        el.focus({ preventScroll: true });
      } catch (_) {
        try {
          el.setAttribute("tabindex", "-1");
          el.focus({ preventScroll: true });
        } catch (_) {}
      }
    };

    if (reduce) {
      window.scrollTo(0, target);
      focusLater();
      close();
      return;
    }

    if (canNativeSmooth) {
      window.scrollTo({ top: target, behavior: "smooth" });
      window.setTimeout(focusLater, 450);
    } else {
      // 스무스 스크롤 폴백 (RAF) — cubic ease-in-out
      const duration = 550;
      const start = performance.now();
      const delta = target - current;
      const ease = (t) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      const step = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const y = current + delta * ease(t);
        window.scrollTo(0, Math.round(y));
        if (t < 1) requestAnimationFrame(step);
        else focusLater();
      };
      requestAnimationFrame(step);
    }
    close();
  };
  return (
    <>
      <Aside>
        <SmallRow>
          <Logo src={LogoSvg} alt="logo" />
          <Small>
            FE Developer
            <br />
            smallants0825
          </Small>
        </SmallRow>
        <Nav $open={open} role="navigation" aria-label="Primary">
          <NavAnchor href="#profile" onClick={onNavClick}>
            Profile
          </NavAnchor>
          <NavAnchor href="#skills" onClick={onNavClick}>
            Skills
          </NavAnchor>
          <NavAnchor href="#projects" onClick={onNavClick}>
            Projects
          </NavAnchor>
          <NavAnchor href="#contact" onClick={onNavClick}>
            Contact
          </NavAnchor>
        </Nav>
        <RightGroup>
          <Year>ChaHoRim</Year>
          <MenuBtn
            aria-label="Toggle navigation"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            $open={open}
          >
            <Bar $open={open} $index={0} />
            <Bar $open={open} $index={1} />
            <Bar $open={open} $index={2} />
          </MenuBtn>
        </RightGroup>
      </Aside>
      <Backdrop $open={open} onClick={close} />
    </>
  );
}

const Aside = styled.aside`
  position: fixed;
  inset: 0 auto 0 0;
  width: 220px;
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: 32px;
  padding: 28px 22px;
  background: transparent;
  z-index: 60;
  border-right: 1px solid #e0e0e0;
  background: rgba(255, 255, 255, 0.9);
  /* initial reveal animation (desktop): left -> right */
  clip-path: inset(0 100% 0 0);
  animation: ${keyframes`from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0 0 0)}`}
    0.6s cubic-bezier(0.2, 0.7, 0.2, 1) 0.1s forwards;
  will-change: clip-path;

  @media (max-width: 1100px) {
    inset: 0 0 auto 0;
    width: 100%;
    height: 72px;
    grid-template-rows: none;
    grid-auto-flow: column;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    border-right: none;
    border-bottom: 1px solid #e0e0e0;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(6px);
    /* mobile reveal: top -> bottom */
    clip-path: inset(0 0 100% 0);
    animation: ${keyframes`from{clip-path:inset(0 0 100% 0)}to{clip-path:inset(0 0 0 0)}`}
      0.5s cubic-bezier(0.2, 0.7, 0.2, 1) 0.05s forwards;
    will-change: clip-path;
  }
`;

const Small = styled.div`
  font-size: 12px;
  color: #6b6f76;
  line-height: 1.5;
`;

const SmallRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Logo = styled.img`
  width: 22px;
  height: 22px;
  object-fit: contain;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 40px;

  @media (max-width: 1100px) {
    flex-direction: row;
    margin-top: 0;
    gap: 22px;
    position: fixed;
    top: 72px;
    left: 0;
    right: 0;
    z-index: 61;
    background: rgba(255, 255, 255, 0.96);
    backdrop-filter: blur(8px);
    padding: 20px 24px 28px;
    flex-direction: column;
    transform: ${({ $open }) =>
      $open ? "translateY(0)" : "translateY(-110%)"};
    opacity: ${({ $open }) => ($open ? 1 : 0)};
    pointer-events: ${({ $open }) => ($open ? "auto" : "none")};
    transition: transform 0.35s cubic-bezier(0.2, 0.7, 0.2, 1),
      opacity 0.3s ease;
  }
`;

const NavAnchor = styled.a`
  text-decoration: none;
  color: #7a7f87;
  font-size: 14px;
  cursor: pointer;
  outline: none;
  &:focus-visible {
    color: #111;
    text-decoration: underline;
  }
  &:hover {
    color: #111;
  }

  @media (max-width: 1100px) {
    text-align: center;
  }
`;

const RightGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Year = styled.div`
  color: #282828;
  font-weight: 700;
`;

const MenuBtn = styled.button`
  display: none;
  @media (max-width: 1100px) {
    display: inline-flex;
    width: 40px;
    height: 40px;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 6px;
    background: rgba(0, 0, 0, 0.04);
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 12px;
  }
`;

const Bar = styled.span`
  width: 22px;
  height: 2px;
  background: #111;
  display: block;
  border-radius: 2px;
  transition: transform 0.35s ease, opacity 0.25s ease;
  ${({ $open, $index }) =>
    $open &&
    ($index === 0
      ? css`
          transform: translateY(7px) rotate(45deg);
        `
      : $index === 1
      ? css`
          opacity: 0;
        `
      : css`
          transform: translateY(-7px) rotate(-45deg);
        `)}
`;

const Backdrop = styled.div`
  display: none;
  @media (max-width: 1100px) {
    display: block;
    position: fixed;
    z-index: 55;
    inset: 72px 0 0 0;
    background: rgba(0, 0, 0, 0.15);
    opacity: ${({ $open }) => ($open ? 1 : 0)};
    pointer-events: ${({ $open }) => ($open ? "auto" : "none")};
    transition: opacity 0.3s ease;
  }
`;
