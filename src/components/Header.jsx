import styled, { css } from "styled-components";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <>
      <Aside>
        <Small>
          FE Developer
          <br />
          smallants0825
        </Small>
        <Nav $open={open}>
          <NavLink onClick={close}>Profile</NavLink>
          <NavLink onClick={close}>Skills</NavLink>
          <NavLink onClick={close}>Projects</NavLink>
          <NavLink onClick={close}>Contact</NavLink>
        </Nav>
        <RightGroup>
          <Year>ChaHoRim</Year>
          <MenuBtn aria-label="Toggle navigation" onClick={() => setOpen(!open)} $open={open}>
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
    background: rgba(255,255,255,0.9);
    backdrop-filter: blur(6px);
  }
`;

const Small = styled.div`
  font-size: 12px;
  color: #6b6f76;
  line-height: 1.5;
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
    background: rgba(255,255,255,0.96);
    backdrop-filter: blur(8px);
    padding: 20px 24px 28px;
    flex-direction: column;
    transform: ${({$open}) => ($open ? 'translateY(0)' : 'translateY(-110%)')};
    opacity: ${({$open}) => ($open ? 1 : 0)};
    pointer-events: ${({$open}) => ($open ? 'auto' : 'none')};
    transition: transform .35s cubic-bezier(.2,.7,.2,1), opacity .3s ease;
  }
`;

const NavLink = styled.button`
  background: none;
  border: none;
  text-align: left;
  color: #7a7f87;
  cursor: pointer;
  font-size: 14px;

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
    background: rgba(0,0,0,0.04);
    border: 1px solid rgba(0,0,0,0.08);
    border-radius: 12px;
  }
`;

const Bar = styled.span`
  width: 22px;
  height: 2px;
  background: #111;
  display: block;
  border-radius: 2px;
  transition: transform .35s ease, opacity .25s ease;
  ${({$open, $index}) =>
    $open && (
      $index === 0
        ? css`transform: translateY(7px) rotate(45deg);`
        : $index === 1
        ? css`opacity: 0;`
        : css`transform: translateY(-7px) rotate(-45deg);`
    )}
`;

const Backdrop = styled.div`
  display: none;
  @media (max-width: 1100px) {
    display: block;
    position: fixed;
    z-index: 55;
    inset: 72px 0 0 0;
    background: rgba(0,0,0,0.15);
    opacity: ${({$open}) => ($open ? 1 : 0)};
    pointer-events: ${({$open}) => ($open ? 'auto' : 'none')};
    transition: opacity .3s ease;
  }
`;


