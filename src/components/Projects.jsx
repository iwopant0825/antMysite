import styled from "styled-components";

export default function Projects() {
  return (
    <Section id="projects" tabIndex={-1}>
      <Grid>
        <Header>
          <Kicker>Projects</Kicker>
          <BigTitle>Selected Works</BigTitle>
        </Header>
        <Cards>
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}>
              <Thumb />
              <CardTitle>Project #{i + 1}</CardTitle>
              <CardText>
                인터랙티브 웹 실험과 3D 요소를 결합한 데모 프로젝트입니다.
                반응형, 접근성, 성능을 고려해 제작했습니다.
              </CardText>
            </Card>
          ))}
        </Cards>
      </Grid>
    </Section>
  );
}

const Section = styled.section`
  padding-left: 220px;
  background: #ffffff;
  padding-top: 80px;
  padding-bottom: 140px;
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
`;

const Header = styled.div`
  margin-bottom: 24px;
`;

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

const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  border: 1px solid #eee;
  border-radius: 16px;
  overflow: hidden;
  background: #fafafa;
  padding: 16px;
`;

const Thumb = styled.div`
  height: 160px;
  background: linear-gradient(135deg, #f0f0f0, #e7e7e7);
  border-radius: 12px;
`;

const CardTitle = styled.h4`
  margin-top: 12px;
  color: #000;
`;

const CardText = styled.p`
  color: #555;
  line-height: 1.6;
`;
