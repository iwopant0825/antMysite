import styled from "styled-components";

export default function Footer() {
  return (
    <Bar>
      <Inner>
        <Brand>ChaHoRim — FE Developer</Brand>
        <Nav>
          <a href="https://github.com/iwopant0825?tab=repositories">GitHub</a>
          <a href="#">Email : ccodingpy0825@gmail.com</a>
        </Nav>
      </Inner>
    </Bar>
  );
}

const Bar = styled.footer`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  border-top: 1px solid #eaeaea;
  width: 100%;
`;

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 14px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  @media (max-width: 1100px) {
    padding: 12px 16px;
    gap: 12px;
  }
`;

const Brand = styled.div`
  font-weight: 700;
  color: #111;
  font-size: 14px;
  @media (max-width: 1100px) {
    font-size: 13px;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 16px;
  a {
    color: #444;
    text-decoration: none;
    font-size: 13px;
  }
  a:hover {
    color: #000;
  }

  @media (max-width: 700px) {
    gap: 12px;
    a {
      font-size: 12px;
    }
  }
`;
