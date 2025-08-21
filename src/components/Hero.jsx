import styled, { keyframes } from "styled-components";
import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Center, useGLTF } from "@react-three/drei";
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
    typeof window !== "undefined" ? window.innerWidth <= 1100 : false
  );
  const [isTablet, setIsTablet] = useState(
    typeof window !== "undefined"
      ? window.innerWidth >= 861 && window.innerWidth <= 1299
      : false
  );
  const [gyroReady, setGyroReady] = useState(null); // null: unknown, true: active, false: fallback
  const [needsPerm, setNeedsPerm] = useState(false);
  const [rainbowProgress, setRainbowProgress] = useState(0); // 0 → 1 fill amount for Interactive Web
  const rainbowRef = useRef(0);
  const rainbowTargetRef = useRef(0);
  const rainbowAnimRef = useRef(0);
  const touchStartYRef = useRef(null);
  const sectionRef = useRef(null);
  const isCoarseRef = useRef(false);
  const pageMouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handler = () => {
      const w = window.innerWidth;
      setIsMobile(w <= 1100);
      setIsTablet(w >= 861 && w <= 1299);
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  // Detect coarse pointer (touch) to tune sensitivity
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia("(pointer: coarse)");
    const set = () => {
      isCoarseRef.current = !!mql.matches;
    };
    set();
    if (mql.addEventListener) mql.addEventListener("change", set);
    else if (mql.addListener) mql.addListener(set);
    return () => {
      if (mql.removeEventListener) mql.removeEventListener("change", set);
      else if (mql.removeListener) mql.removeListener(set);
    };
  }, []);

  // Track page-level mouse position (for desktop orientation even outside canvas)
  useEffect(() => {
    const onMove = (e) => {
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      pageMouseRef.current.x = (e.clientX / w) * 2 - 1;
      pageMouseRef.current.y = (e.clientY / h) * 2 - 1;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    return () => {
      if (rainbowAnimRef.current) cancelAnimationFrame(rainbowAnimRef.current);
    };
  }, []);

  // wheel/touch gating at top: 목표 진행률로 누적 후 RAF 보간으로 부드럽게 반영
  const ensureRainbowAnimating = () => {
    if (rainbowAnimRef.current) return;
    const step = () => {
      const target = Math.max(0, Math.min(1, rainbowTargetRef.current));
      const current = rainbowRef.current;
      const diff = target - current;
      const ad = Math.abs(diff);
      const lerpK = isCoarseRef.current ? 0.22 : 0.18;
      const next = ad < 0.001 ? target : current + diff * lerpK;
      rainbowRef.current = next;
      setRainbowProgress(next);
      if (Math.abs(target - next) >= 0.001) {
        rainbowAnimRef.current = requestAnimationFrame(step);
      } else {
        rainbowAnimRef.current = 0;
      }
    };
    rainbowAnimRef.current = requestAnimationFrame(step);
  };
  const applyDeltaToRainbow = (delta) => {
    const baseK = 0.0009;
    const k = isCoarseRef.current ? 0.0012 : isMobile ? 0.0011 : baseK;
    const nextTarget = Math.max(
      0,
      Math.min(1, rainbowTargetRef.current + delta * k)
    );
    rainbowTargetRef.current = nextTarget;
    ensureRainbowAnimating();
  };

  // Add non-passive global listeners in capture phase to intercept scroll even over the sidebar
  useEffect(() => {
    const handleWheel = (e) => {
      const atTop =
        (typeof window !== "undefined"
          ? window.scrollY || document.documentElement.scrollTop
          : 0) <= 2;
      if (!atTop) return;
      const dy = e.deltaY;
      if (
        (dy > 0 && rainbowRef.current < 1) ||
        (dy < 0 && rainbowRef.current > 0)
      ) {
        e.preventDefault();
        e.stopPropagation();
        applyDeltaToRainbow(dy);
      }
    };
    const handleTouchStart = (e) => {
      touchStartYRef.current =
        e.touches && e.touches[0] ? e.touches[0].clientY : null;
    };
    const handleTouchMove = (e) => {
      const atTop =
        (typeof window !== "undefined"
          ? window.scrollY || document.documentElement.scrollTop
          : 0) <= 2;
      if (!atTop) return;
      if (touchStartYRef.current == null) return;
      const y =
        e.touches && e.touches[0]
          ? e.touches[0].clientY
          : touchStartYRef.current;
      const dy = touchStartYRef.current - y;
      if (
        (dy > 0 && rainbowRef.current < 1) ||
        (dy < 0 && rainbowRef.current > 0)
      ) {
        if (e.cancelable) e.preventDefault();
        e.stopPropagation();
        // 터치 장치에서 추가 증폭으로 더 적은 드래그로 채워지게 함
        const gain = isCoarseRef.current ? 0.8 : 1;
        applyDeltaToRainbow(dy * gain);
      }
    };
    window.addEventListener("wheel", handleWheel, {
      passive: false,
      capture: true,
    });
    window.addEventListener("touchstart", handleTouchStart, {
      passive: true,
      capture: true,
    });
    window.addEventListener("touchmove", handleTouchMove, {
      passive: false,
      capture: true,
    });
    return () => {
      window.removeEventListener("wheel", handleWheel, { capture: true });
      window.removeEventListener("touchstart", handleTouchStart, {
        capture: true,
      });
      window.removeEventListener("touchmove", handleTouchMove, {
        capture: true,
      });
    };
  }, []);
  return (
    <Section id="hero" ref={sectionRef} tabIndex={-1}>
      <Container>
        {(() => {
          const lines = isMobile
            ? ["FE", "DEVELOPER", "Interactive Web", "ChaHoRim"]
            : [
                "FE",
                "DEVELOPER",
                "Interactive Web",
                isTablet
                  ? "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ChaHoRim"
                  : "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ChaHoRim",
              ];
          return (
            <FitBigWords
              lines={lines}
              onMeasureCha={setChaRect}
              rainbowProgress={rainbowProgress}
            />
          );
        })()}
        <ModelOverlay
          style={(() => {
            const vw = typeof window !== "undefined" ? window.innerWidth : 1024;
            // 모바일: 하단 중앙 고정 배치
            if (isMobile || !chaRect) {
              const size = Math.min(560, Math.max(220, vw * 1.05));
              return {
                left: "50%",
                transform: "translateX(-50%)",
                bottom: 12,
                width: size,
                height: size,
              };
            }
            // 데스크톱/태블릿: ChaHoRim의 왼쪽 중앙에 배치, 크기는 글자 높이에 비례
            // 테블릿에서 ChaHoRim의 높이가 상대적으로 커질 수 있으니 안전하게 보정
            const desktopSize = Math.min(
              isTablet ? 380 : 440,
              Math.max(
                150,
                Math.round(chaRect.height * (isTablet ? 1.25 : 1.45))
              )
            );
            const gapLeft = isTablet ? 12 : 16;
            return {
              left: Math.max(
                8,
                Math.round(chaRect.left - desktopSize - gapLeft)
              ),
              top: Math.round(
                chaRect.top + chaRect.height / 2 - desktopSize / 2
              ),
              transform: "none",
              bottom: "auto",
              width: desktopSize,
              height: desktopSize,
            };
          })()}
        >
          <Canvas
            orthographic
            camera={{ position: [0, 1.2, 25], zoom: 90 }}
            onWheel={(e) => {
              // 기본 스크롤은 허용하고, 상위 리스너로의 전파만 차단
              e.stopPropagation();
            }}
            style={{
              touchAction: isMobile || isTablet ? "pan-y pinch-zoom" : "auto",
            }}
          >
            <ambientLight intensity={0.6} />
            <MouseLight />
            <directionalLight position={[3, 5, 3]} intensity={0.9} />
            {isMobile ? (
              gyroReady === false ? (
                <>
                  <MouseParallax />
                  <Center>
                    <Appear3D initialScale={0.06}>
                      <LogoModel rotation={[0, -Math.PI / 2, 0]} scale={0.1} />
                    </Appear3D>
                  </Center>
                </>
              ) : (
                <GyroGroup
                  onReady={() => setGyroReady(true)}
                  onUnsupported={() => setGyroReady(false)}
                >
                  <Center>
                    <Appear3D initialScale={0.06}>
                      <LogoModel rotation={[0, -Math.PI / 2, 0]} scale={0.1} />
                    </Appear3D>
                  </Center>
                </GyroGroup>
              )
            ) : (
              <>
                <OrbitControls
                  enableZoom={false}
                  enablePan={false}
                  enableDamping={false}
                  enableRotate={false}
                />
                <Center>
                  <MouseOrient pageMouseRef={pageMouseRef}>
                    <Appear3D initialScale={0.045}>
                      <ResponsiveModel />
                    </Appear3D>
                  </MouseOrient>
                </Center>
              </>
            )}
          </Canvas>
        </ModelOverlay>
        {/* <InfoCard>
          <InfoTitle>
            <Typewriter text="FE Developer" speed={80} startDelay={120} />
          </InfoTitle>
          <InfoText>
            <Typewriter
              text={"I specialize in building interactive and responsive web experiences that adapt seamlessly across devices. With a focus on clean code and modern frameworks, I transform complex ideas into efficient and scalable solutions. My goal is to craft user-centered interfaces that combine performance, accessibility, and elegant design."}
              speed={120}
              startDelay={520}
            />
          </InfoText>
        </InfoCard> */}

        <HeroGrid>
          <LeftRail />
          <RightRail />
        </HeroGrid>

        {/* inline 3D model is rendered near ChaHoRim via ModelOverlay */}
      </Container>
    </Section>
  );
}

function FitBigWords({ lines, onMeasureCha, rainbowProgress = 0 }) {
  const containerRef = useRef(null);
  const spansRef = useRef([]);
  const containerRORef = useRef(null);
  const rafRef = useRef(0);
  const lastWidthRef = useRef(0);
  const fittingRef = useRef(false);
  const lastChaRectRef = useRef({
    left: null,
    top: null,
    width: null,
    height: null,
  });
  const rainbowIdxRef = useRef(-1);

  useLayoutEffect(() => {
    const base = 320; // base font size to measure from
    const fitNow = () => {
      const container = containerRef.current;
      if (!container) return;
      if (fittingRef.current) return;
      fittingRef.current = true;

      const width = Math.round(container.clientWidth);
      if (width !== lastWidthRef.current) {
        spansRef.current.forEach((span) => {
          if (!span) return;
          const text = (span.textContent || "")
            .replace(/\s+/g, "")
            .toUpperCase();
          // FE는 두 글자라 scrollWidth 기반 피팅이 불안정할 수 있어 폭 비례 공식을 사용
          if (text === "FE") {
            const minFloor = width <= 380 ? 44 : 56;
            const k = 0.24; // 컨테이너 폭 대비 폰트 크기 비율
            const size = Math.max(minFloor, Math.floor(width * k));
            span.style.fontSize = size + "px";
            return;
          }
          span.style.fontSize = base + "px";
          const sw = span.scrollWidth || 1;
          const ratio = width / sw;
          const minFloor = width <= 380 ? 44 : 56;
          const size = Math.max(minFloor, Math.floor(base * ratio));
          span.style.fontSize = size + "px";
        });
        lastWidthRef.current = width;
      }

      // vertical cap only on small screens to prevent double scroll
      const isNarrow =
        typeof window !== "undefined" ? window.innerWidth <= 860 : false;
      if (isNarrow) {
        const GAP_PX = 24; // must match BigWords grid gap
        const LINE_HEIGHT = 0.8; // must match BigWords line-height
        const host = container.parentElement; // Container
        const hostH = host
          ? host.clientHeight
          : typeof window !== "undefined"
          ? window.innerHeight
          : 900;
        const verticalPadding = 40; // headroom to avoid touching bottom
        const capH = hostH - verticalPadding; // strict cap to avoid extra height on small screens

        let totalHeight = 0;
        let lineCount = 0;
        spansRef.current.forEach((span) => {
          if (!span) return;
          const size = parseFloat(span.style.fontSize) || 0;
          totalHeight += size * LINE_HEIGHT;
          lineCount += 1;
        });
        totalHeight += GAP_PX * Math.max(0, lineCount - 1);
        if (totalHeight > 0 && capH > 0 && totalHeight > capH) {
          const scale = Math.max(0.5, Math.min(1, capH / totalHeight));
          spansRef.current.forEach((span) => {
            if (!span) return;
            const size = parseFloat(span.style.fontSize) || 0;
            span.style.fontSize = Math.floor(size * scale) + "px";
          });
        }
      }

      // measure indices
      const idxInteractive = lines.findIndex((t) =>
        String(t)
          .replace(/&nbsp;/g, "")
          .replace(/\s+/g, "")
          .toUpperCase()
          .includes("INTERACTIVEWEB")
      );
      rainbowIdxRef.current = idxInteractive;

      // measure ChaHoRim span rect and notify only on actual changes
      const idx = lines.findIndex((t) =>
        String(t)
          .replace(/&nbsp;/g, "")
          .toUpperCase()
          .includes("CHAHORIM")
      );
      if (idx >= 0 && spansRef.current[idx]) {
        const spanEl = spansRef.current[idx];
        const sRect = spanEl.getBoundingClientRect();
        const cRect = container.getBoundingClientRect();
        const nextRect = {
          left: sRect.left - cRect.left,
          top: sRect.top - cRect.top,
          width: sRect.width,
          height: sRect.height,
        };
        const prev = lastChaRectRef.current;
        const changed =
          prev.left === null ||
          Math.abs(prev.left - nextRect.left) > 0.5 ||
          Math.abs(prev.top - nextRect.top) > 0.5 ||
          Math.abs(prev.width - nextRect.width) > 0.5 ||
          Math.abs(prev.height - nextRect.height) > 0.5;
        if (changed) {
          lastChaRectRef.current = nextRect;
          onMeasureCha && onMeasureCha(nextRect);
        }
      }

      fittingRef.current = false;
    };

    const scheduleFit = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(fitNow);
    };

    // initial precise measure after fonts load
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => scheduleFit()).catch(() => scheduleFit());
    } else {
      scheduleFit();
    }

    // observe container width only (stable trigger)
    const ro = new ResizeObserver(() => scheduleFit());
    containerRORef.current = ro;
    if (containerRef.current) ro.observe(containerRef.current);

    // window resize fallback
    const on = () => scheduleFit();
    window.addEventListener("resize", on);

    return () => {
      window.removeEventListener("resize", on);
      if (containerRORef.current && containerRef.current) {
        containerRORef.current.unobserve(containerRef.current);
      }
      if (containerRORef.current) containerRORef.current.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [lines]);

  // Apply rainbow fill behind the Interactive Web line using an absolutely-positioned child
  useLayoutEffect(() => {
    const idx = rainbowIdxRef.current;
    if (idx < 0) return;
    const span = spansRef.current[idx];
    if (!span) return;
    const p = Math.max(0, Math.min(1, rainbowProgress));
    span.style.position = "relative";
    span.style.zIndex = "1";
    span.style.color = "";

    let fill = span.querySelector(":scope > .__rainbow_fill");
    if (!fill) {
      fill = document.createElement("div");
      fill.className = "__rainbow_fill";
      fill.style.position = "absolute";
      fill.style.left = "0";
      fill.style.top = "50%";
      fill.style.transform = "translateY(-50%)";
      fill.style.height = "110%";
      fill.style.borderRadius = "0px";
      fill.style.pointerEvents = "none";
      fill.style.background =
        "linear-gradient(90deg, #ff0040, #ff8a00, #ffd400, #2bdc00, #00c2ff, #7a00ff)";
      fill.style.opacity = "0.8";
      fill.style.zIndex = "0";
      fill.style.width = "100%";
      fill.style.transformOrigin = "left center";
      fill.style.willChange = "transform";
      span.appendChild(fill);
    }
    const spanH = span.offsetHeight || 0;
    fill.style.height = Math.max(8, Math.round(spanH * 1.1)) + "px";
    fill.style.transform = `translateY(-50%) scaleX(${p})`;

    let white = span.querySelector(":scope > .__white_text");
    if (!white) {
      white = document.createElement("span");
      white.className = "__white_text";
      white.textContent = span.textContent;
      white.style.position = "absolute";
      white.style.left = "0";
      white.style.top = "0";
      white.style.whiteSpace = "inherit";
      white.style.letterSpacing = "inherit";
      white.style.lineHeight = "inherit";
      white.style.font = "inherit";
      white.style.pointerEvents = "none";
      white.style.color = "#fff";
      white.style.overflow = "hidden";
      white.style.zIndex = "2";
      white.style.willChange = "clip-path";
      span.appendChild(white);
    }
    const rightClip = Math.max(0, Math.min(100, (1 - p) * 100));
    white.style.clipPath = `inset(0 ${rightClip}% 0 0)`;
  }, [rainbowProgress]);

  const isStrong = (text) => {
    const normalized = String(text)
      .replace(/&nbsp;/g, "")
      .replace(/\s+/g, "")
      .toUpperCase();
    return normalized === "DEVELOPER" || normalized === "CHAHORIM";
  };

  return (
    <BigWords ref={containerRef}>
      {lines.map((t, i) => {
        const display = String(t).replace(/&nbsp;/g, "\u00A0");
        return (
          <Line
            key={i}
            className={isStrong(t) ? "strong" : ""}
            ref={(el) => (spansRef.current[i] = el)}
            style={{ "--delay": `${i * 120}ms` }}
          >
            {display}
          </Line>
        );
      })}
    </BigWords>
  );
}

const Section = styled.section`
  /* layout */
  --sidebar: 220px;
  --hpad: 24px; /* horizontal padding inside container */
  --contentW: calc(100% - var(--sidebar) - (var(--hpad) * 2));

  padding-left: var(--sidebar);
  min-height: 1075px;
  background: #ffffff;
  overflow-x: hidden; /* prevent accidental horizontal scroll */
  overflow-y: clip; /* prevent absolute children from growing page height */
  overscroll-behavior-y: contain; /* prevent scroll chaining */

  /* Tablet (861–1299): viewport height 기반으로 유동 */
  @media (max-width: 1299px) and (min-width: 861px) {
    min-height: 100dvh;
  }

  /* 모바일/소형 태블릿에서는 텍스트가 잘리지 않도록 섹션의 세로 오버플로우 허용 */
  @media (max-width: 1100px) {
    overflow-y: visible;
  }

  /* Mobile (≤1100): 상단 고정 헤더(72px)를 제외하고 꽉 차게 */
  @media (max-width: 1100px) {
    margin-top: 72px;
    min-height: min(
      calc(100dvh - 72px),
      820px
    ); /* prevent excessive growth on ultra-tall */
    --sidebar: 0px;
    padding-left: 0;
  }
`;

const Container = styled.div`
  position: relative;
  min-height: inherit; /* stretch to section's min-height */
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 40px 24px 80px;
`;

const BigWords = styled.div`
  position: absolute;
  inset: 0 auto auto 0; /* left:0; top:0 */
  width: var(--contentW);
  pointer-events: none;
  font-family: "Pretendard-Medium", "Pretendard-Regular", system-ui,
    -apple-system, Segoe UI, Roboto, Helvetica, Arial;
  font-weight: 500; /* 실제 포함된 가중치로 고정 */
  font-synthesis: none; /* 브라우저의 가짜 Bold 생성 방지 */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 0.8;
  letter-spacing: -0.02em;
  display: grid;
  gap: 24px;
  overflow-wrap: anywhere;
  word-break: break-word;
  white-space: normal;

  span {
    display: block;
    white-space: nowrap;
    color: rgba(0, 0, 0, 0.2);
    font-weight: inherit;
  }
  span.strong {
    color: #000000;
    font-weight: inherit;
  }

  @media (max-width: 1299px) and (min-width: 861px) {
    width: min(92vw, var(--contentW));
    gap: 18px;
  }

  /* 모바일/소형 태블릿에서는 좌우 여백을 더 확보해 잘림 방지 */
  @media (max-width: 1100px) {
    width: min(92vw, var(--contentW));
    gap: 14px; /* reduce gap on small widths */
  }
`;

const slideIn = keyframes`
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
`;

const Line = styled.span`
  animation-name: ${slideIn};
  animation-duration: 600ms;
  animation-timing-function: cubic-bezier(0.2, 0.7, 0.2, 1);
  animation-fill-mode: both;
  animation-delay: var(--delay, 0ms);
`;

const InfoCard = styled.div`
  position: relative;
  margin-left: calc(clamp(24px, 12vw, 260px) + 200px);
  margin-top: clamp(-24px, -1.8vw, 20px); /* 더 살짝 아래로 */
  width: min(36ch, 40vw);
  max-width: 520px;

  @media (max-width: 1299px) and (min-width: 861px) {
    margin-left: calc(clamp(24px, 10vw, 200px) + 100px);
    margin-top: clamp(-16px, -1.5vw, 18px);
    width: min(38ch, 48vw);
  }

  @media (max-width: 1024px) {
    margin-left: calc(clamp(16px, 6vw, 120px) + 12px);
    margin-top: clamp(-8px, -1vw, 18px);
    width: min(42ch, 56vw);
  }

  @media (max-width: 1100px) {
    margin-left: 16px;
    width: 90%;
    max-width: none;
  }
`;

const InfoTitle = styled.div`
  color: #111111;
  font-weight: 700;
  margin-bottom: 10px;
  font-size: clamp(16px, 2.2vw, 20px);
  -webkit-text-stroke: 0.35px rgba(255, 255, 255, 0.45);
  text-shadow: 0 1px 1px rgb(255, 255, 255);
`;

const InfoText = styled.p`
  color: #2f343a;
  font-size: clamp(13px, 1.8vw, 14px);
  line-height: 1.6;
  -webkit-text-stroke: 0.25px rgba(255, 255, 255, 0.35);
  text-shadow: 0 1px 1px rgb(255, 255, 255);
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
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
`;

const RightRail = styled.div``;

const ModelOverlay = styled.div`
  position: absolute;
  z-index: 2;
  /* 모바일/태블릿에서는 섹션 스크롤을 우선 허용하기 위해 부모는 기본적으로 스크롤 통과 */
  pointer-events: none;
  transition: top 0.15s ease, left 0.15s ease, width 0.15s ease,
    height 0.15s ease;
  /* 캔버스는 상호작용 허용. 터치 스크롤이 끊기지 않도록 기본 제스처 허용 */
  canvas {
    pointer-events: auto;
  }
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

  @media (max-width: 1100px) {
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

function MouseParallax({ pageMouseRef }) {
  const { viewport } = useThree();
  useFrame(({ camera }) => {
    if (!viewport || viewport.width <= 6) return;
    const mx = pageMouseRef?.current?.x ?? 0;
    const my = pageMouseRef?.current?.y ?? 0;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mx * 1, 0.03);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, my * 1, 0.01);
    camera.position.z = THREE.MathUtils.lerp(
      camera.position.z,
      Math.max(4, Math.abs(mx * my * 4)),
      0.01
    );
    camera.rotation.y = THREE.MathUtils.lerp(
      camera.rotation.y,
      mx * -Math.PI * 0.025,
      0.001
    );
  });
  return null;
}

// Rotate a group by page-level mouse movement (desktop only)
function MouseOrient({ pageMouseRef, children }) {
  const ref = useRef();
  useFrame(() => {
    if (!ref.current) return;
    const mx = pageMouseRef?.current?.x ?? 0;
    const my = pageMouseRef?.current?.y ?? 0;
    const targetX = THREE.MathUtils.clamp(
      my * Math.PI * 0.15,
      -Math.PI * 0.25,
      Math.PI * 0.25
    );
    const targetY = THREE.MathUtils.clamp(
      mx * Math.PI * 0.25,
      -Math.PI * 0.4,
      Math.PI * 0.4
    );
    ref.current.rotation.x = THREE.MathUtils.lerp(
      ref.current.rotation.x,
      targetX,
      0.08
    );
    ref.current.rotation.y = THREE.MathUtils.lerp(
      ref.current.rotation.y,
      targetY,
      0.08
    );
  });
  return <group ref={ref}>{children}</group>;
}

function Appear3D({ initialScale = 0.04, children }) {
  const group = useRef();
  useEffect(() => {
    let raf;
    const start = performance.now();
    const dur = 650;
    const tick = () => {
      if (!group.current) return;
      const t = Math.min(1, (performance.now() - start) / dur);
      const e = 1 - Math.pow(1 - t, 3);
      const s = initialScale + (1 - initialScale) * e;
      group.current.scale.set(s, s, s);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    group.current.scale.set(initialScale, initialScale, initialScale);
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [initialScale]);
  return <group ref={group}>{children}</group>;
}

function Typewriter({ text, speed = 30, startDelay = 0 }) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    let timerId = 0;
    let loopId = 0;
    const start = () => {
      // speed: chars per second
      const tickMs = 16; // ~60fps
      const charsPerTick = Math.max(1, Math.round((speed * tickMs) / 1000));
      loopId = window.setInterval(() => {
        setShown((s) => {
          if (s >= text.length) {
            window.clearInterval(loopId);
            return s;
          }
          return Math.min(text.length, s + charsPerTick);
        });
      }, tickMs);
    };
    if (startDelay > 0) timerId = window.setTimeout(start, startDelay);
    else start();
    return () => {
      if (timerId) window.clearTimeout(timerId);
      if (loopId) window.clearInterval(loopId);
    };
  }, [text, speed, startDelay]);
  return <span>{text.slice(0, shown)}</span>;
}

function ResponsiveModel() {
  const { size } = useThree();
  // Overlay width (desktop): 160px → 420px 에서 스케일 0.05 → 0.11로 맵핑
  const minW = 160;
  const maxW = 420;
  const minS = 0.05;
  const maxS = 0.11;
  const w = Math.max(minW, Math.min(maxW, size.width));
  const t = (w - minW) / (maxW - minW);
  const s = minS + t * (maxS - minS);
  return <LogoModel rotation={[0, -Math.PI / 2, 0]} scale={s} />;
}

// Gyro-controlled group: applies device orientation to group rotation
function GyroGroup({ children, onReady, onUnsupported }) {
  const ref = useRef(null);
  const base = useRef({ beta: null, gamma: null });
  const lastRaw = useRef({ beta: 0, gamma: 0 });
  const lastEvent = useRef(Date.now());
  const lastReset = useRef(Date.now());
  useEffect(() => {
    const handle = (e) => {
      const rawBeta = e.beta ?? 0; // degrees
      const rawGamma = e.gamma ?? 0; // degrees
      // 최초 접속 시의 기기 방향을 기준점으로 삼음
      if (base.current.beta === null || base.current.gamma === null) {
        base.current.beta = rawBeta;
        base.current.gamma = rawGamma;
      }
      lastRaw.current.beta = rawBeta;
      lastRaw.current.gamma = rawGamma;
      lastEvent.current = Date.now();
      const beta = (rawBeta - base.current.beta) * (Math.PI / 180);
      const gamma = (rawGamma - base.current.gamma) * (Math.PI / 180);
      // 감도 증가: 배수 1.0, 각도 제한 ±60°
      const targetX = THREE.MathUtils.clamp(
        beta * 1.0,
        -Math.PI / 3,
        Math.PI / 3
      );
      const targetY = THREE.MathUtils.clamp(
        gamma * 1.0,
        -Math.PI / 3,
        Math.PI / 3
      );
      if (ref.current) {
        ref.current.rotation.x = THREE.MathUtils.lerp(
          ref.current.rotation.x,
          targetX,
          0.25
        );
        ref.current.rotation.y = THREE.MathUtils.lerp(
          ref.current.rotation.y,
          targetY,
          0.25
        );
      }
    };

    // 권한 요청은 외부에서 처리. 여기선 리스너만 붙여본다.
    let attached = false;
    if (typeof window !== "undefined" && "DeviceOrientationEvent" in window) {
      window.addEventListener("deviceorientation", handle, true);
      attached = true;
    }
    if (!attached && "ondeviceorientationabsolute" in window) {
      window.addEventListener("deviceorientationabsolute", handle, true);
      attached = true;
    }
    if (attached) {
      onReady && onReady();
    } else {
      onUnsupported && onUnsupported();
    }

    // periodic snap-to-zero: disabled (requested to remove 0.5s auto reset)
    // const RESET_INTERVAL = 500; // ms
    // const snap = () => {
    //   base.current.beta = lastRaw.current.beta;
    //   base.current.gamma = lastRaw.current.gamma;
    //   lastReset.current = Date.now();
    // };
    // const interval = setInterval(snap, RESET_INTERVAL);

    // let raf;
    // const loop = () => {
    //   const since = Date.now() - lastReset.current;
    //   const RETURN_WINDOW = 450; // ms, 부드럽게 돌아오는 구간
    //   if (since < RETURN_WINDOW && ref.current) {
    //     // 작은 보간 계수로 스무스하게 복귀
    //     const k = 0.08;
    //     ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, 0, k);
    //     ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, 0, k);
    //   }
    //   raf = requestAnimationFrame(loop);
    // };
    // raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("deviceorientation", handle, true);
      window.removeEventListener("deviceorientationabsolute", handle, true);
      // clearInterval(interval);
      // cancelAnimationFrame(raf);
    };
  }, []);
  return <group ref={ref}>{children}</group>;
}

const PermButton = styled.button`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 88px;
  z-index: 70;
  padding: 10px 14px;
  background: #111;
  color: #fff;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  @media (min-width: 861px) {
    display: none;
  }
`;
