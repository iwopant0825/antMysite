import styled from "styled-components";
import { useLayoutEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Center } from "@react-three/drei";
import * as THREE from "three";
import { LogoModel } from "./LogoModel";

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
          <InfoTitle>FE Developer</InfoTitle>
          <InfoText>
          I specialize in building interactive and responsive web experiences that adapt seamlessly across devices.
With a focus on clean code and modern frameworks, I transform complex ideas into efficient and scalable solutions.
My goal is to craft user-centered interfaces that combine performance, accessibility, and elegant design.
          </InfoText>
        </InfoCard>

        <HeroGrid>
          <LeftRail />
          <RightRail />
        </HeroGrid>

        <ModelWrap>
          <ModelInner>
            <Canvas orthographic camera={{ position: [0, 1.2, 25], zoom: 90 }}>
              <ambientLight intensity={0.6} />
              <MouseLight />
              <directionalLight position={[3, 5, 3]} intensity={0.9} />
              <OrbitControls enableZoom={false} enableDamping={false} />
              <MouseParallax />
              <Center>
                <LogoModel rotation={[0, -Math.PI / 2, 0]} scale={0.12} />
              </Center>
            </Canvas>
          </ModelInner>
        </ModelWrap>
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
  margin-top: 40px;
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
  margin-top: 120px;
`;

const LeftRail = styled.div``;

const Center3D = styled.div`
  height: clamp(380px, 55vh, 560px);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0,0,0,0.12);
`;

const RightRail = styled.div``;

const ModelWrap = styled.div`
  position: relative;
  margin-top: 120px;
  border-radius: 24px;
  overflow: hidden;
  height: clamp(300px, 50vh, 520px);
  z-index: 1; /* keep below absolute BigWords (z-index default stacking) */
  width: min(72%, 1100px);
  margin-left: auto;
  margin-right: auto;
`;

const ModelInner = styled.div`
  width: 100%;
  height: 100%;
`;

function MouseLight() {
  const ref = useRef(null);
  const { viewport } = useThree();
  useFrame(({ mouse }) => {
    if (!ref.current) return;
    const x = (mouse.x * viewport.width) / 2;
    const y = (mouse.y * viewport.height) / 2;
    ref.current.position.set(x, y, 20);
  });
  return <pointLight ref={ref} intensity={1.4} distance={80} decay={2} />;
}

function MouseParallax() {
  const { viewport } = useThree();
  if (viewport && viewport.width > 6) {
    useFrame(({ mouse, camera }) => {
      camera.position.x = THREE.MathUtils.lerp(
        camera.position.x,
        mouse.x * 1,
        0.03
      );
      camera.position.y = THREE.MathUtils.lerp(
        camera.position.y,
        mouse.y * 1,
        0.01
      );
      camera.position.z = THREE.MathUtils.lerp(
        camera.position.z,
        Math.max(4, Math.abs(mouse.x * mouse.y * 4)),
        0.01
      );
      camera.rotation.y = THREE.MathUtils.lerp(
        camera.rotation.y,
        mouse.x * -Math.PI * 0.025,
        0.001
      );
    });
  }
  return null;
}


