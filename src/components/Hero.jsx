import styled from "styled-components";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useLayoutEffect, useRef } from "react";

function Box() {
  return (
    <mesh>
      <boxGeometry args={[3, 3, 3]} />
      <meshStandardMaterial color="#5560ff" metalness={0.3} roughness={0.4} />
    </mesh>
  );
}

export default function Hero() {
  return (
    <Section>
      <Container>
        <FitBigWords lines={["FE", "DEVELOPER", "Interactive", "Web"]} />
        <InfoCard>
          <InfoTitle>PrismCraft</InfoTitle>
          <InfoText>
            Whether you're an experienced professional or just starting your journey
            in the world of 3D design
          </InfoText>
        </InfoCard>

        <HeroGrid>
          <LeftRail />
          <Center3D>
            <Canvas camera={{ position: [2.8, 2.8, 4.2] }}>
              <ambientLight intensity={0.7} />
              
              <directionalLight position={[3, 5, 2]} intensity={1.2} />
              <Box />
            </Canvas>
          </Center3D>
          <RightRail />
        </HeroGrid>
      </Container>
    </Section>
  );
}

function FitBigWords({ lines }) {
  const containerRef = useRef(null);
  const spansRef = useRef([]);

  useLayoutEffect(() => {
    const base = 320; // base font size to measure from
    const fit = () => {
      const container = containerRef.current;
      if (!container) return;
      const width = container.clientWidth;
      spansRef.current.forEach((span) => {
        if (!span) return;
        span.style.fontSize = base + "px";
        const ratio = width / span.scrollWidth;
        const size = Math.max(56, Math.min(base, base * ratio));
        span.style.fontSize = size + "px";
      });
    };
    fit();
    const on = () => fit();
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);

  const isStrong = (text) => {
    const upper = String(text).toUpperCase();
    return upper === 'DEVELOPER' || upper === 'WEB';
  };

  return (
    <BigWords ref={containerRef}>
      {lines.map((t, i) => (
        <span
          key={i}
          className={isStrong(t) ? 'strong' : ''}
          ref={(el) => (spansRef.current[i] = el)}
        >
          {t}
        </span>
      ))}
    </BigWords>
  );
}

const Section = styled.section`
  /* layout */
  --sidebar: 220px;
  --hpad: 24px; /* horizontal padding inside container */
  --contentW: calc(100vw - var(--sidebar) - (var(--hpad) * 2));

  padding-left: var(--sidebar);
  min-height: 100vh;
  background: #ffffff;
  overflow-x: hidden; /* prevent accidental horizontal scroll */
`;

const Container = styled.div`
  position: relative;
  padding: 40px 24px 80px;
`;

const BigWords = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  pointer-events: none;
  font-weight: 800;
  line-height: 0.8;
  letter-spacing: -0.02em;
  display: grid;
  gap: 24px;
  max-width: var(--contentW);
  overflow-wrap: anywhere;
  word-break: break-word;
  white-space: normal;

  span { display: block; white-space: nowrap; color: rgba(0,0,0,0.2); }
  span.strong { color: #000000; }
`;

const InfoCard = styled.div`
  position: relative;
  margin-left: 260px;
  margin-top: 80px;
  max-width: 360px;
`;

const InfoTitle = styled.div`
  color: #000000;
  font-weight: 700;
  margin-bottom: 10px;
`;

const InfoText = styled.p`
  color: #3b3f45;
  font-size: 14px;
`;

const HeroGrid = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr minmax(520px, 700px) 1fr;
  gap: 20px;
  align-items: end;
  margin-top: 200px;
`;

const LeftRail = styled.div``;

const Center3D = styled.div`
  height: clamp(380px, 55vh, 560px);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0,0,0,0.12);
`;

const RightRail = styled.div``;


