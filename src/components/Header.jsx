import styled from "styled-components";

export default function Header() {
  return (
    <Aside>
      <Small>
        FE Developer
        <br />
        smallants0825
      </Small>
      <Nav>
        <NavLink>Profile</NavLink>
        <NavLink>Skills</NavLink>
        <NavLink>Projects</NavLink>
        <NavLink>Contact</NavLink>
      </Nav>
      <Year>ChaHoRim</Year>
    </Aside>
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
`;

const NavLink = styled.button`
  background: none;
  border: none;
  text-align: left;
  color: #7a7f87;
  cursor: pointer;
  font-size: 14px;
`;

const Year = styled.div`
  color: #282828;
  font-weight: 700;
`;


