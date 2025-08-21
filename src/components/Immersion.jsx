import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import * as THREE from "three";

export default function Immersion() {
  return (
    <Section id="immersion" tabIndex={-1}>
      <TitleRow>
        <Title>Vision</Title>
      </TitleRow>
      <CanvasWrapper>
        <Canvas orthographic camera={{ position: [0, 0, 24], zoom: 70 }}>
          <InitCameraFacing />
          <OrbitControls />
          <color attach="background" args={["#ffffff"]} />
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 10, 5]} intensity={0.9} />
          <GroundWords />
        </Canvas>
      </CanvasWrapper>
    </Section>
  );
}

function InitCameraFacing() {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(0, 0, 24);
    camera.rotation.set(0, 0, 0);
    camera.updateProjectionMatrix();
  }, [camera]);
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

  // EN/KO 한 줄씩 같은 Y(화면 행)에 배치
  const lines = [
    { en: "The Key", ko: "핵심은" },
    { en: "is", ko: "바로" },
    { en: "Immersion", ko: "몰입감" },
  ];
  const enSize = 1.6; // EN
  const koSize = 0.5; // KO 더 작게
  const gapX = 0.5; // EN- KO 간격 더 축소
  const koFont = "/font/Pretendard-Thin.otf"; // KO는 더 얇은 폰트
  const lineGap = enSize * 1.4; // 세로 간격 더 촘촘하게

  // 최대 쌍 너비 추정값(대략 중앙 정렬용, 정밀 위치는 각 라인에서 측정 폭으로 배치)
  const approxWidth = (t, size) => t.replace(/\s+/g, "").length * size * 0.62;
  const maxPairW = Math.max(
    ...lines.map(
      (l) => approxWidth(l.en, enSize) + gapX + approxWidth(l.ko, koSize)
    )
  );
  const xLeft = -maxPairW / 2; // 좌우 중앙 기준 EN 시작 X (라인별 측정 후 KO는 정밀 위치)
  const startY = ((lines.length - 1) / 2) * lineGap; // 중앙 기준 시작 Y

  return (
    <group position={[groupX, 0, 0]}>
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
      // 안정화를 위해 소수점 절삭
      setEnWidth(Number(size.x || 0));
    } catch (_) {
      // fallback: 대략 폭 추정
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
