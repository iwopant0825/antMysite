import styled from "styled-components";
import { projects, miniProjects } from "@/data/projects";

export default function Projects() {
  return (
    <Section id="projects" tabIndex={-1}>
      <Grid>
        <Header>
          <Kicker>Projects</Kicker>
        </Header>
        <Cards>
          {projects.map((p) => {
            const showDemo = !!p.demo && p.demo !== '#' && p.demo !== '';
            const showGit = !!p.github && p.github !== '#' && p.github !== '';
            return (
              <Card key={p.id}>
                <Thumb style={{ backgroundImage: p.image?.endsWith('.svg') ? undefined : `url(${p.image})` }}>
                  {p.image?.endsWith('.svg') && <img src={p.image} alt="thumb" />}
                </Thumb>
                <CardBody>
                  <CardTitle>{p.title}</CardTitle>
                  <CardText>{p.description}</CardText>
                  {(showDemo || showGit) && (
                    <Actions>
                      {showDemo && <A href={p.demo} target="_blank" rel="noreferrer">Demo</A>}
                      {showGit && <A href={p.github} target="_blank" rel="noreferrer">GitHub</A>}
                    </Actions>
                  )}
                  {p.tech && (<Techs>{p.tech.map((t) => (<li key={t}>{t}</li>))}</Techs>)}
                </CardBody>
              </Card>
            );
          })}
        </Cards>

        <MinorHeader>
          <SubTitle>More small projects</SubTitle>
        </MinorHeader>
        <MiniGrid>
          {miniProjects.map((m) => (
            <MiniCard key={m.id}>
              <MiniTitle>{m.title}</MiniTitle>
              <MiniDesc>{m.description}</MiniDesc>
              {!!m.link && m.link !== '#' && <MiniLink href={m.link}>View</MiniLink>}
            </MiniCard>
          ))}
        </MiniGrid>
      </Grid>
    </Section>
  );
}

const Section = styled.section`
  padding-left: 220px;
  background: #ffffff;
  padding-top: 80px;
  padding-bottom: 200px;
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
const MinorHeader = styled.div`
  margin-top: 36px;
  margin-bottom: 12px;
`;

const SubTitle = styled.h4`
  color: #0b0c0e;
  font-weight: 800;
`;

const MiniGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const MiniCard = styled.a`
  display: block;
  border: 1px solid #e4e4e7;
  padding: 14px;
  text-decoration: none;
  color: inherit;
  border-radius: 8px;
  transition: border-color 200ms ease, transform 200ms ease, box-shadow 200ms ease;
  &:hover { transform: translateY(-2px); border-color: #111214; box-shadow: 0 6px 20px rgba(0,0,0,0.06); }
`;

const MiniTitle = styled.div`
  font-weight: 700;
`;

const MiniDesc = styled.div`
  margin-top: 6px;
  color: #555;
  line-height: 1.55;
`;

const MiniLink = styled.span`
  display: inline-block;
  margin-top: 8px;
  font-size: 12px;
  color: #0b0c0e;
  text-decoration: underline;
`;


const Cards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Card = styled.div`
  width: 100%;
  border: 1px solid #d9d9dc;
  border-radius: 0; /* 각진 테두리 */
  background: #ffffff;
  padding: 16px;
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 16px;
  align-items: center;
  transition: border-color 200ms ease, transform 200ms ease, box-shadow 200ms ease;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }

  &:hover {
    transform: translateY(-2px);
    border-color: #111214;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
  }
`;

const Thumb = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1; /* 정사각형 */
  background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.06) 0%,
      rgba(255, 255, 255, 0) 100%
    ),
    repeating-linear-gradient(135deg, #0f1012 0 8px, #141518 8px 16px);
  border: 1px solid #cfcfd4;
  border-radius: 0; /* 각진 썸네일 */
  background-size: cover;
  background-position: center;
  display: grid;
  place-items: center;
  overflow: hidden;
  img { max-width: 80%; height: auto; }
`;

const CardBody = styled.div`
  display: grid;
  gap: 8px;
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 8px;
`;

const A = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  border: 1px solid #d9d9dc;
  border-radius: 6px;
  color: #0b0c0e;
  text-decoration: none;
  font-size: 13px;
`;

const Techs = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
  list-style: none;
  padding: 0;
  li { font-size: 12px; color: #444; }
`;

const CardTitle = styled.h4`
  margin-top: 14px;
  color: #0b0c0e;
  font-weight: 800;
`;

const CardText = styled.p`
  color: #3b3f45;
  line-height: 1.65;
  margin-top: 6px;
`;
