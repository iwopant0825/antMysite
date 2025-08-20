import styled from 'styled-components'
import Polygon from '/Polygon.svg'

export default function Profile() {
  return (
    <Section>
      <Grid>
        <LeftVisual>
          <GlassCard />
        </LeftVisual>
        <RightCopy>
          <Kicker>Creative Community</Kicker>
          <Paragraph>
            Whether you're a seasoned professional or a passionate hobbyist,
            there's a place for you in our growing community.
          </Paragraph>

          <StampRow>
            <Stamp>24</Stamp>
            <Flower />
          </StampRow>

          <BigTitle>
            Join our
            <br />
            community of
            <br />
            creatives
          </BigTitle>
        </RightCopy>
      </Grid>
    </Section>
  )
}

const Section = styled.section`
  padding-left: 220px;
  background: #ffffff;
  padding-top: 80px;
  padding-bottom: 160px;
`;

const Grid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: 1.1fr 1.2fr;
  gap: 32px;
  align-items: start;
`;

const LeftVisual = styled.div`
  position: relative;
  height: 420px;
`;

const GlassCard = styled.div`
  position: absolute;
  left: -10%;
  top: -10%;
  width: 480px;
  height: 360px;
  background: linear-gradient(145deg, #b4f2ff 0%, #a68bff 50%, #6b5bff 100%);
  border-radius: 40px;
  filter: saturate(110%) contrast(105%);
  transform: rotate(-12deg);
`;

const RightCopy = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const Kicker = styled.h3`
  color: #4f5dff;
  font-size: 24px;
  font-weight: 800;
`;

const Paragraph = styled.p`
  color: #666;
  line-height: 1.6;
`;

const StampRow = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  margin: 12px 0 8px;
`;

const Stamp = styled.div`
  color: #4f5dff;
  font-weight: 800;
`;

const Flower = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #b5f3ff, #5b5bff 60%, #8a5bff 100%);
  box-shadow: inset 0 0 12px rgba(255,255,255,0.6);
`;

const BigTitle = styled.h2`
  color: #4f5dff;
  font-weight: 900;
  font-size: clamp(48px, 8vw, 120px);
  line-height: 0.9;
`;


