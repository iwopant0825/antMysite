import styled, { css, keyframes } from "styled-components";
import { useState } from "react";
import { safeFocus } from "@/utils/dom";
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
    if (el) {
      // URL 해시를 변경하지 않고 스크롤만 수행
      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
      }
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
      window.setTimeout(() => safeFocus(el), 300);
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
          <NavAnchor href="#timeline" onClick={onNavClick}>
            Timeline
          </NavAnchor>
          <NavAnchor href="#projects" onClick={onNavClick}>
            Projects
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
  z-index: ${({ theme }) => theme.z.header};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  /* initial reveal animation (desktop): left -> right */
  clip-path: inset(0 100% 0 0);
  animation: ${keyframes`from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0 0 0)}`}
    0.6s cubic-bezier(0.2, 0.7, 0.2, 1) 0.1s forwards;
  will-change: clip-path;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}px) {
    inset: 0 0 auto 0;
    width: 100%;
    height: 72px;
    grid-template-rows: none;
    grid-auto-flow: column;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    border-right: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    background: ${({ theme }) => theme.colors.surface};
    backdrop-filter: blur(6px);
    /* mobile reveal: top -> bottom (초기엔 사용했으나 드롭다운 클리핑 방지를 위해 비활성화) */
    /* clip-path 애니메이션이 자식 fixed 요소를 자르므로 제거 */
    clip-path: none;
    animation: none;
    will-change: auto;
    position: fixed; /* 상단 고정으로 스택 분리 */
    left: 0; right: 0; top: 0;
  }
`;

const Small = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textMuted};
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

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}px) {
    flex-direction: row;
    margin-top: 0;
    gap: 32px; /* 드롭다운 항목 간격 확대 */
    position: fixed;
    top: ${({ theme }) => theme.layout.headerHeightMobile}px;
    left: 0;
    right: 0;
    z-index: ${({ theme }) => theme.z.dropdown};
    background: ${({ theme }) => theme.colors.surfaceMuted};
    backdrop-filter: blur(8px);
    padding: 28px 24px 36px; /* 영역 여백 확대 */
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
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
  cursor: pointer;
  outline: none;
  &:focus-visible {
    color: ${({ theme }) => theme.colors.text};
    text-decoration: underline;
  }
  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}px) {
    text-align: center;
  }
`;

const RightGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Year = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 700;
`;

const MenuBtn = styled.button`
  display: none;
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}px) {
    display: inline-flex;
    width: 40px;
    height: 40px;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 6px;
    background: ${({ theme }) => theme.colors.overlaySoftBg};
    border: 1px solid ${({ theme }) => theme.colors.overlaySoftBorder};
    border-radius: 12px;
  }
`;

const Bar = styled.span`
  width: 22px;
  height: 2px;
  background: ${({ theme }) => theme.colors.text};
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
    z-index: 1990;
    inset: 72px 0 0 0;
    background: rgba(0, 0, 0, 0.15);
    opacity: ${({ $open }) => ($open ? 1 : 0)};
    pointer-events: ${({ $open }) => ($open ? "auto" : "none")};
    transition: opacity 0.3s ease;
  }
`;
