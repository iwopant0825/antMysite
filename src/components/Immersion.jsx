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
  const engagedRef = useRef(false); // 한 번 시작하면 진행이 0으로 돌아오기 전까진 유지
  const currentProgressRef = useRef(0);
  const wheelAccumRef = useRef(0);
  const touchAccumRef = useRef(0);

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

    // 헤더(72px)를 고려한 가시비율 계산
    const isVisibleEnough = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const header = 72;
      const usable = Math.max(1, vh - header);
      const topVisible = Math.min(rect.bottom, vh) - Math.max(rect.top, header);
      const visible = Math.max(0, topVisible);
      const ratio = visible / Math.min(usable, rect.height || usable);
      return ratio >= 0.98; // 98% 이상 보이면 허용 (더 아래로 스크롤 후 시작)
    };

    const shouldHandle = () => {
      if (engagedRef.current) return true;
      if (isVisibleEnough()) {
        engagedRef.current = true;
        wheelAccumRef.current = 0;
        touchAccumRef.current = 0;
        return true;
      }
      return false;
    };

    const TRIGGER = 160; // 스냅 임계값 상향

    const snapTo = (dir) => {
      if (dir > 0) targetRef.current = 1; // 정면
      else targetRef.current = 0; // 바닥
      ensureRAF();
    };

    const onWheel = (e) => {
      if (!shouldHandle()) return;
      const dy = e.deltaY || 0;
      // 끝 상태에서 반대쪽으로 더 스크롤되면 기본 스크롤 허용
      const atStart =
        currentProgressRef.current <= 0.001 && targetRef.current <= 0.001;
      const atEnd =
        currentProgressRef.current >= 0.999 && targetRef.current >= 0.999;
      if ((atStart && dy < 0) || (atEnd && dy > 0)) return; // 기본 스크롤 진행
      if (e.cancelable) e.preventDefault();
      e.stopPropagation();
      wheelAccumRef.current += dy;
      if (wheelAccumRef.current >= TRIGGER) {
        wheelAccumRef.current = 0;
        snapTo(1);
      } else if (wheelAccumRef.current <= -TRIGGER) {
        wheelAccumRef.current = 0;
        snapTo(-1);
      }
    };

    let touchStartY = null;
    const onTouchStart = (e) => {
      touchStartY = e.touches?.[0]?.clientY ?? null;
      touchAccumRef.current = 0;
    };
    const onTouchMove = (e) => {
      if (!shouldHandle() || touchStartY == null) return;
      const y = e.touches?.[0]?.clientY ?? touchStartY;
      const dy = touchStartY - y;
      const atStart =
        currentProgressRef.current <= 0.001 && targetRef.current <= 0.001;
      const atEnd =
        currentProgressRef.current >= 0.999 && targetRef.current >= 0.999;
      if ((atStart && dy < 0) || (atEnd && dy > 0)) return;
      if (e.cancelable) e.preventDefault();
      e.stopPropagation();
      touchAccumRef.current += dy;
      touchStartY = y;
      if (touchAccumRef.current >= TRIGGER) {
        touchAccumRef.current = 0;
        snapTo(1);
      } else if (touchAccumRef.current <= -TRIGGER) {
        touchAccumRef.current = 0;
        snapTo(-1);
      }
    };
    const onTouchEnd = () => {
      touchAccumRef.current = 0;
      touchStartY = null;
    };

    window.addEventListener("wheel", onWheel, {
      passive: false,
      capture: true,
    });
    window.addEventListener("touchstart", onTouchStart, {
      passive: true,
      capture: true,
    });
    window.addEventListener("touchmove", onTouchMove, {
      passive: false,
      capture: true,
    });
    window.addEventListener("touchend", onTouchEnd, {
      passive: true,
      capture: true,
    });
    return () => {
      window.removeEventListener("wheel", onWheel, { capture: true });
      window.removeEventListener("touchstart", onTouchStart, { capture: true });
      window.removeEventListener("touchmove", onTouchMove, { capture: true });
      window.removeEventListener("touchend", onTouchEnd, { capture: true });
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    };
  }, []);

  return (
    <Section id="immersion" tabIndex={-1} ref={sectionRef}>
      <TitleRow>
        <Title>Vision</Title>
      </TitleRow>
      <CanvasWrapper>
        <Canvas orthographic camera={{ position: [0, 25, 0.001], zoom: 70 }}>
          <CameraRig progress={progress} />
          <color attach="background" args={["#ffffff"]} />
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 10, 5]} intensity={0.9} />
          <GroundWords />
          <OrbitControls
            enableRotate={false}
            enablePan={false}
            enableZoom={false}
          />
        </Canvas>
      </CanvasWrapper>
    </Section>
  );
}

function CameraRig({ progress }) {
  const { camera } = useThree();
  useFrame(() => {
    const t = THREE.MathUtils.clamp(progress, 0, 1);
    const ease = t * t * (3 - 2 * t);
    const startPos = new THREE.Vector3(0, 25, 0.001);
    const endPos = new THREE.Vector3(0, 6, 24);
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

function GroundWords() {
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
  const groupX = -viewport.width * 0.25 + pxToWorld * 260;

  const lines = [
    { en: "The Key", ko: "핵심은" },
    { en: "is", ko: "바로" },
    { en: "Immersion", ko: "몰입감" },
  ];
  const enSize = 1.6;
  const koSize = 0.5;
  const gapX = 0.5;
  const koFont = "/font/Pretendard-Thin.otf";
  const lineGap = enSize * 1.4;

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
