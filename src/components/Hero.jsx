import styled from "styled-components";
import { useLayoutEffect, useRef, useState, useEffect } from "react";
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
  const [chaRect, setChaRect] = useState(null);
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= 860 : false
  );
  const [gyroReady, setGyroReady] = useState(null); // null: unknown, true: active, false: fallback

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth <= 860);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return (
    <Section>
      <Container>
        {(() => {
          const lines = isMobile
            ? ["FE", "DEVELOPER", "Interactive Web", "ChaHoRim"]
            : [
                "FE",
                "DEVELOPER",
                "Interactive Web",
                "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ChaHoRim",
              ];
          return (
            <FitBigWords
              lines={lines}
              onMeasureCha={setChaRect}
            />
          );
        })()}
        {chaRect && (
          <ModelOverlay
            style={(() => {
              const desktopSize = Math.min(420, Math.max(120, chaRect.height * 1.8));
              if (isMobile) {
                const vw = typeof window !== 'undefined' ? window.innerWidth : 360;
                const size = Math.min(560, Math.max(220, vw * 1.05));
                return {
                  left: '50%',
                  transform: 'translateX(-50%)',
                  top: 'calc(95dvh - 20px - ' + size + 'px)',
                  bottom: 'auto',
                  width: size,
                  height: size,
                };
              }
              return {
                left: Math.max(8, chaRect.left - desktopSize - 16),
                top: chaRect.top + chaRect.height / 2 - desktopSize / 2,
                width: desktopSize,
                height: desktopSize,
              };
            })()}
          >
            <Canvas orthographic camera={{ position: [0, 1.2, 25], zoom: 90 }} onWheel={(e) => e.stopPropagation()}>
              <ambientLight intensity={0.6} />
              <MouseLight />
              <directionalLight position={[3, 5, 3]} intensity={0.9} />
              {isMobile ? (
                gyroReady === true ? (
                  <GyroGroup onReady={() => setGyroReady(true)} onUnsupported={() => setGyroReady(false)}>
                    <ResponsiveModel />
                  </GyroGroup>
                ) : (
                  <>
                    <MouseParallax />
                    <Center>
                      <ResponsiveModel />
                    </Center>
                  </>
                )
              ) : (
                <>
                  <OrbitControls enableZoom={false} enablePan={false} enableDamping={false} />
                  <MouseParallax />
                  <Center>
                    <ResponsiveModel />
                  </Center>
                </>
              )}
            </Canvas>
          </ModelOverlay>
        )}
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

        {/* inline 3D model is rendered near ChaHoRim via ModelOverlay */}
      </Container>
    </Section>
  );
}

function FitBigWords({ lines, onMeasureCha }) {
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
        // grow/shrink to fit the available width (no artificial upper cap)
        const size = Math.max(56, base * ratio);
        span.style.fontSize = size + "px";
      });

      // measure ChaHoRim span rect and notify
      const idx = lines.findIndex((t) =>
        String(t).replace(/&nbsp;/g, "").toUpperCase().includes("CHAHORIM")
      );
      if (idx >= 0 && spansRef.current[idx]) {
        const spanEl = spansRef.current[idx];
        const sRect = spanEl.getBoundingClientRect();
        const cRect = container.getBoundingClientRect();
        onMeasureCha &&
          onMeasureCha({
            left: sRect.left - cRect.left,
            top: sRect.top - cRect.top,
            width: sRect.width,
            height: sRect.height,
          });
      }
    };
    fit();
    const on = () => fit();
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);

  const isStrong = (text) => {
    const normalized = String(text)
      .replace(/&nbsp;/g, '')
      .replace(/\s+/g, '')
      .toUpperCase();
    return normalized === 'DEVELOPER' || normalized === 'CHAHORIM';
  };

  return (
    <BigWords ref={containerRef}>
      {lines.map((t, i) => {
        const display = String(t).replace(/&nbsp;/g, '\u00A0');
        return (
          <span
            key={i}
            className={isStrong(t) ? 'strong' : ''}
            ref={(el) => (spansRef.current[i] = el)}
          >
            {display}
          </span>
        );
      })}
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

  @media (max-width: 860px) {
    margin-top: 100px;
    --sidebar: 0px;
    padding-left: 0;
  }
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
  margin-left: clamp(24px, 12vw, 260px);
  margin-top: clamp(16px, 4vw, 40px);
  width: min(36ch, 40vw);
  max-width: 520px;

  @media (max-width: 1024px) {
    margin-left: clamp(16px, 6vw, 120px);
    width: min(42ch, 56vw);
  }

  @media (max-width: 860px) {
    margin-left: 16px;
    width: 90%;
    max-width: none;
  }
`;

const InfoTitle = styled.div`
  color: #000000;
  font-weight: 700;
  margin-bottom: 10px;
  font-size: clamp(16px, 2.2vw, 20px);
`;

const InfoText = styled.p`
  color: #3b3f45;
  font-size: clamp(13px, 1.8vw, 14px);
  line-height: 1.6;
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

const ModelOverlay = styled.div`
  position: absolute;
  z-index: 2;
  pointer-events: auto;
  transition: top 0.15s ease, left 0.15s ease, width 0.15s ease, height 0.15s ease;
`;

const ModelWrap = styled.div`
  position: relative;
  margin-top: 240px;
  border-radius: 24px;
  overflow: hidden;
  height: clamp(300px, 50vh, 520px);
  z-index: 1; /* keep below absolute BigWords (z-index default stacking) */
  /* lock to content left, with fine offset that adapts by width */
  width: clamp(540px, 60vw, var(--contentW));
  max-width: var(--contentW);
  --model-offset: clamp(120px, 10vw, 420px);
  margin-left: calc((100vw - var(--contentW)) / 2 - var(--model-offset));
  margin-right: auto;
  overscroll-behavior: contain;

  @media (max-width: 860px) {
    width: min(96vw, var(--contentW));
    --model-offset: 0px;
    margin-left: calc((100vw - var(--contentW)) / 2);
  }
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
  useFrame(({ mouse, camera }) => {
    if (!viewport || viewport.width <= 6) return; // 훅은 항상 호출, 조건은 내부 처리
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
  return null;
}

function ResponsiveModel() {
  const { size } = useThree();
  // Map overlay canvas width to a smaller model scale range
  // Overlay width (current): 120px → 420px
  // Scale mapping reduced: 0.045 → 0.10 (smaller overall)
  const minW = 120;
  const maxW = 420;
  const minS = 0.045;
  const maxS = 0.10;
  const w = Math.max(minW, Math.min(maxW, size.width));
  const t = (w - minW) / (maxW - minW);
  const s = minS + t * (maxS - minS);
  return <LogoModel rotation={[0, -Math.PI / 2, 0]} scale={s} />;
}

// Gyro-controlled group: applies device orientation to group rotation
function GyroGroup({ children, onReady, onUnsupported }) {
  const ref = useRef(null);
  useEffect(() => {
    const handle = (e) => {
      const beta = (e.beta || 0) * (Math.PI / 180); // x-axis
      const gamma = (e.gamma || 0) * (Math.PI / 180); // y-axis
      if (ref.current) {
        ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, beta * 0.15, 0.1);
        ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, gamma * 0.15, 0.1);
      }
    };

    // iOS 13+ requires permission
    let supported = false;
    if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
      DeviceMotionEvent.requestPermission()
        .then((r) => {
          if (r === 'granted') supported = true;
        })
        .catch(() => {})
        .finally(() => {
          if (supported) {
            window.addEventListener('deviceorientation', handle, true);
            onReady && onReady();
          } else {
            onUnsupported && onUnsupported();
          }
        });
    } else {
      if (typeof window !== 'undefined' && 'DeviceOrientationEvent' in window) {
        window.addEventListener('deviceorientation', handle, true);
        onReady && onReady();
      } else {
        onUnsupported && onUnsupported();
      }
    }
    return () => window.removeEventListener('deviceorientation', handle, true);
  }, []);
  return <group ref={ref}>{children}</group>;
}


