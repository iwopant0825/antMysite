import styled from "styled-components";

export default function Skills() {
  return (
    <Section id="skills" tabIndex={-1}>
      <Grid>
        <Left>
          <Kicker>Skills</Kicker>
          <BigTitle>Stack & Tools</BigTitle>
        </Left>
        <Right>
          <List>
            <li>
              <strong>Languages</strong> — TypeScript, JavaScript, HTML, CSS
            </li>
            <li>
              <strong>Frameworks</strong> — React, Vite, React Three Fiber, Drei
            </li>
            <li>
              <strong>Styling</strong> — styled-components, Tailwind(경험)
            </li>
            <li>
              <strong>3D</strong> — three.js, gltfjsx, @react-spring/three
            </li>
            <li>
              <strong>Infra</strong> — GitHub Actions, Vercel
            </li>
          </List>
        </Right>
      </Grid>
    </Section>
  );
}

const Section = styled.section`
  padding-left: 220px;
  background: #f8f8f8;
  padding-top: 80px;
  padding-bottom: 120px;
  scroll-margin-top: 84px;

  @media (max-width: 1100px) {
    padding-left: 0;
    padding-top: 60px;
  }
`;

const Grid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

const Left = styled.div``;
const Right = styled.div``;

const Kicker = styled.h3`
  color: #000000;
  font-size: 20px;
  font-weight: 800;
`;

const BigTitle = styled.h2`
  color: #000000;
  font-weight: 900;
  font-size: clamp(36px, 6vw, 80px);
  line-height: 1;
  margin-top: 8px;
`;

const List = styled.ul`
  display: grid;
  gap: 12px;
  color: #3b3f45;
  li {
    line-height: 1.6;
  }
  strong {
    color: #000;
  }
`;
