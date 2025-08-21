import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import * as THREE from "three";

export default function Immersion() {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0); // 0: top-down, 1: front
  const targetRef = useRef(0);
  const rafRef = useRef(0);
  const engagedRef = useRef(false);
  const currentProgressRef = useRef(0);
  const scrollAccumRef = useRef(0);
  const lastScrollYRef = useRef(0);

  const [device, setDevice] = useState("desktop");
  useEffect(() => {
    const detect = () => {
      const w = window.innerWidth || 1200;
      if (w <= 700) setDevice("mobile");
      else if (w <= 1100) setDevice("tablet");
      else setDevice("desktop");
    };
    detect();
    window.addEventListener("resize", detect, { passive: true });
    return () => window.removeEventListener("resize", detect);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const clamp01 = (v) => Math.max(0, Math.min(1, v));

    const ensureRAF = () => {
      if (rafRef.current) return;
      const step = () => {
        setProgress((cur) => {
          const tgt = clamp01(targetRef.current);
          const diff = tgt - cur;
          const next = Math.abs(diff) < 0.001 ? tgt : cur + diff * 0.12;
          currentProgressRef.current = next;
          if (next <= 0.001) engagedRef.current = false;
          if (Math.abs(tgt - next) < 0.001) {
            rafRef.current = 0;
          } else {
            rafRef.current = requestAnimationFrame(step);
          }
          return next;
        });
      };
      rafRef.current = requestAnimationFrame(step);
    };

    const isVisibleEnough = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const header = 72;
      const usable = Math.max(1, vh - header);
      const topVisible = Math.min(rect.bottom, vh) - Math.max(rect.top, header);
      const visible = Math.max(0, topVisible);
      const ratio = visible / Math.min(usable, rect.height || usable);
      const need =
        device === "mobile" ? 0.92 : device === "tablet" ? 0.95 : 0.98;
      return ratio >= need;
    };

    const TRIGGER = device === "mobile" ? 260 : device === "tablet" ? 240 : 220;

    const snapTo = (dir) => {
      targetRef.current = dir > 0 ? 1 : 0;
      engagedRef.current = true;
      ensureRAF();
    };

    const resetAccumIfLeaving = () => {
      if (!isVisibleEnough()) {
        scrollAccumRef.current = 0;
        engagedRef.current = false;
      }
    };

    const onScroll = () => {
      resetAccumIfLeaving();
      if (!isVisibleEnough()) {
        lastScrollYRef.current = window.scrollY;
        return;
      }
      const atStart =
        currentProgressRef.current <= 0.001 && targetRef.current <= 0.001;
      const atEnd =
        currentProgressRef.current >= 0.999 && targetRef.current >= 0.999;
      const y = window.scrollY;
      const dy = y - (lastScrollYRef.current || y);
      lastScrollYRef.current = y;

      if (dy === 0) return;
      if ((atStart && dy < 0) || (atEnd && dy > 0)) return; // 반대방향은 통과

      // 섹션 내부에서만 누적
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const header = 72;
      const within = center > header && center < (window.innerHeight || 0);
      if (!within) return;

      scrollAccumRef.current += dy;
      if (scrollAccumRef.current >= TRIGGER) {
        scrollAccumRef.current = 0;
        snapTo(1);
      } else if (scrollAccumRef.current <= -TRIGGER) {
        scrollAccumRef.current = 0;
        snapTo(-1);
      }
    };

    lastScrollYRef.current = window.scrollY;
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    };
  }, [device]);

  return (
    <Section id="immersion" tabIndex={-1} ref={sectionRef}>
      <TitleRow>
        <Title>Vision</Title>
      </TitleRow>
      <CanvasWrapper>
        <Canvas
          orthographic
          camera={{ position: [0, 25, 0.001], zoom: 70 }}
          style={{ touchAction: "auto" }}
        >
          <CameraRig progress={progress} device={device} />
          <color attach="background" args={["#ffffff"]} />
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 10, 5]} intensity={0.9} />
          <GroundWords device={device} />
          <OrbitControls
            enabled={device === "desktop"}
            enableRotate={false}
            enablePan={false}
            enableZoom={false}
          />
        </Canvas>
      </CanvasWrapper>
    </Section>
  );
}

function CameraRig({ progress, device }) {
  const { camera } = useThree();
  useFrame(() => {
    const t = THREE.MathUtils.clamp(progress, 0, 1);
    const ease = t * t * (3 - 2 * t);
    const startY = device === "mobile" ? 20 : device === "tablet" ? 22 : 25;
    const endY = device === "mobile" ? 4.5 : device === "tablet" ? 5.5 : 6;
    const startPos = new THREE.Vector3(0, startY, 0.001);
    const endPos = new THREE.Vector3(0, endY, 24);
    const pos = new THREE.Vector3().lerpVectors(startPos, endPos, ease);
    camera.position.copy(pos);
    const startRotX = -Math.PI / 2;
    const endRotX = 0;
    camera.rotation.x = THREE.MathUtils.lerp(startRotX, endRotX, ease);
    camera.rotation.y = 0;
    camera.updateProjectionMatrix();
  });
  return null;
}

function GroundWords({ device }) {
  const common = {
    font: "/font/Pretendard-Medium.otf",
    color: "#000",
    anchorX: "left",
    anchorY: "middle",
    letterSpacing: 0.02,
    depthOffset: -1,
  };
  const { viewport, size } = useThree();
  const pxToWorld = viewport.width / size.width;
  let groupX = -viewport.width * 0.25 + pxToWorld * 260;
  if (device === "tablet") groupX = -viewport.width * 0.12 + pxToWorld * 140;
  if (device === "mobile") groupX = 0;

  const lines = [
    { en: "The Key", ko: "핵심은" },
    { en: "is", ko: "바로" },
    { en: "Immersion", ko: "몰입감" },
  ];
  const enSize = device === "mobile" ? 0.8 : device === "tablet" ? 1.2 : 1.6;
  const koSize = device === "mobile" ? 0.28 : device === "tablet" ? 0.42 : 0.5;
  const gapX = device === "mobile" ? 0.26 : device === "tablet" ? 0.42 : 0.5;
  const koFont = "/font/Pretendard-Thin.otf";
  const lineGap =
    enSize * (device === "mobile" ? 1.1 : device === "tablet" ? 1.25 : 1.4);

  const approxWidth = (t, size) => t.replace(/\s+/g, "").length * size * 0.62;
  const maxPairW = Math.max(
    ...lines.map(
      (l) => approxWidth(l.en, enSize) + gapX + approxWidth(l.ko, koSize)
    )
  );
  const xLeft = -maxPairW / 2;
  const startY = ((lines.length - 1) / 2) * lineGap;

  return (
    <group position={[groupX, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      {lines.map((l, i) => (
        <PairLine
          key={l.en}
          en={l.en}
          ko={l.ko}
          x={xLeft}
          y={startY - i * lineGap}
          enSize={enSize}
          koSize={koSize}
          gapX={gapX}
          common={common}
          koFont={koFont}
        />
      ))}
    </group>
  );
}

function PairLine({ en, ko, x, y, enSize, koSize, gapX, common, koFont }) {
  const enRef = useRef(null);
  const [enWidth, setEnWidth] = useState(0);

  const handleSync = (self) => {
    try {
      if (!self.geometry.boundingBox) self.geometry.computeBoundingBox();
      const size = new THREE.Vector3();
      self.geometry.boundingBox.getSize(size);
      setEnWidth(Number(size.x || 0));
    } catch (_) {
      const approx = String(en).replace(/\s+/g, "").length * enSize * 0.58;
      setEnWidth(approx);
    }
  };

  return (
    <group>
      <Text
        ref={enRef}
        onSync={handleSync}
        position={[x, y, 0]}
        fontSize={enSize}
        anchorX="left"
        anchorY="middle"
        material-depthTest={false}
        {...common}
      >
        {en}
      </Text>
      <Text
        position={[x + enWidth + gapX, y, 0]}
        fontSize={koSize}
        color="#6b6f76"
        anchorX="left"
        anchorY="middle"
        font={koFont}
        material-depthTest={false}
        letterSpacing={0.015}
        depthOffset={-1}
      >
        {ko}
      </Text>
    </group>
  );
}

const Section = styled.section`
  padding-left: 220px;
  background: #ffffff;
  height: 100vh;
  padding-top: 40px;
  padding-bottom: 120px;
  scroll-margin-top: 84px;
  position: relative;
  touch-action: pan-y;
  -ms-touch-action: pan-y;
  overscroll-behavior-y: auto;

  @media (max-width: 1100px) {
    padding-left: 0;
    padding-top: 24px;
  }
`;

const TitleRow = styled.div`
  margin: 0 90px auto;
  padding: 0 24px;
  position: relative;
  z-index: 1;
  @media (max-width: 1100px) {
    margin: 0 40px auto;
  }
  @media (max-width: 700px) {
    margin: 0 16px auto;
  }
`;

const Title = styled.h3`
  color: #000000;
  font-size: 20px;
  font-weight: 800;
`;

const CanvasWrapper = styled.div`
  position: absolute;
  inset: 0 0 0 0;
  z-index: 0;
`;
