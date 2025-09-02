import styled from "styled-components";
import { useEffect, useRef, useState, useMemo } from "react";
import { observeOnce } from "@/utils/dom";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

export default function Skills() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    return observeOnce(sectionRef.current, () => setVisible(true), {
      root: null, rootMargin: "0px 0px -20% 0px", threshold: 0.2,
    });
  }, []);

  const logos = [
    {
      name: "React",
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    },
    {
      name: "React Native",
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    },
    {
      name: "TypeScript",
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    },
    {
      name: "JavaScript",
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    },
    {
      name: "HTML5",
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    },
    {
      name: "CSS3",
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    },
    {
      name: "Three.js",
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg",
      invert: true,
    },
    {
      name: "R3F",
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg",
      invert: true,
    },
    {
      name: "Next.js",
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      invert: true,
    },
    {
      name: "NestJS",
      src: "https://cdn.simpleicons.org/nestjs/E0234E",
    },
    {
      name: "styled-components",
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/styledcomponents/styledcomponents-plain.svg",
    },
    {
      name: "Vite",
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg",
    },
    {
      name: "Node.js",
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    },
    {
      name: "Tailwind",
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    },
    {
      name: "Git",
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    },
    {
      name: "GitHub",
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
      invert: true,
    },
    {
      name: "Vercel",
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg",
      invert: true,
    },
    {
      name: "Figma",
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    },
  ];

  return (
    <Section
      id="skills"
      tabIndex={-1}
      ref={sectionRef}
      data-visible={visible ? "1" : "0"}
    >
      <Grid>
        <Left>
          <Kicker data-visible={visible ? "1" : "0"}>Skills</Kicker>
          {/* <CanvasWrap aria-label="3D skills playground">
            <Canvas
              shadows
              camera={{ position: [0, 3.2, 6], fov: 50 }}
              style={{ width: "100%", height: "100%" }}
            >
              <ambientLight intensity={0.55} />
              <directionalLight
                position={[3, 6, 4]}
                intensity={2}
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
              />
              <Floor />
              <LogoParticles items={logos} active={visible} />
            </Canvas>
          </CanvasWrap> */}
        </Left>
        <Right>
          <LogoGrid>
            {logos.map((l, i) => (
              <LogoItem
                key={l.name}
                title={l.name}
                $visible={visible}
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                <img
                  src={l.src}
                  alt={l.name}
                  loading="lazy"
                  className={l.invert ? "invert" : ""}
                />
                <span>{l.name}</span>
              </LogoItem>
            ))}
          </LogoGrid>
        </Right>
      </Grid>
    </Section>
  );
}

function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[20, 12]} />
      <meshStandardMaterial color="#0f0f10" roughness={1} metalness={0} />
    </mesh>
  );
}

function LogoParticles({ items, active = false }) {
  const textures = useTexture(items.map((i) => i.src));
  const models = useMemo(
    () => items.map((it, idx) => ({
      name: it.name,
      tex: textures[idx],
      invert: !!it.invert,
      key: `${it.name}-${idx}`,
    })),
    [items, textures]
  );
  return (
    <group>
      {models.map((m, i) => (
        <LogoParticle key={m.key} texture={m.tex} invert={m.invert} index={i} active={active} />
      ))}
    </group>
  );
}

function LogoParticle({ texture, invert = false, index = 0, active = false }) {
  const ref = useRef();
  const vel = useRef({ x: (Math.random() - 0.5) * 0.6, y: -Math.random() * 0.2, z: (Math.random() - 0.5) * 0.4 });
  const size = useMemo(() => THREE.MathUtils.lerp(0.32, 0.52, Math.random()), []);
  const pos0 = useMemo(() => ({ x: THREE.MathUtils.lerp(-2.4, 2.4, Math.random()), y: THREE.MathUtils.lerp(2.8, 4.8, Math.random()), z: THREE.MathUtils.lerp(-1.4, 1.4, Math.random()) }), []);
  const bounds = { x: 3.2, z: 2.4, floorY: 0 };
  const g = 9.8; // gravity
  const damping = 0.35; // bounce restitution
  const fric = 0.96; // ground friction per frame

  useEffect(() => {
    if (!texture) return;
    texture.anisotropy = 4;
    texture.flipY = false;
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
  }, [texture]);

  useFrame((state, dt) => {
    if (!active) return;
    const t = Math.min(0.033, dt || 0.016);
    if (!ref.current) return;
    const p = ref.current.position;
    // integrate
    vel.current.y -= g * t * 0.9;
    p.x += vel.current.x * t;
    p.y += vel.current.y * t;
    p.z += vel.current.z * t;

    // ground collision
    if (p.y - size * 0.5 <= bounds.floorY) {
      p.y = bounds.floorY + size * 0.5;
      if (Math.abs(vel.current.y) > 0.1) vel.current.y = -vel.current.y * damping;
      else vel.current.y = 0;
      vel.current.x *= fric;
      vel.current.z *= fric;
    }

    // side walls
    if (p.x + size * 0.5 >= bounds.x || p.x - size * 0.5 <= -bounds.x) {
      p.x = THREE.MathUtils.clamp(p.x, -bounds.x + size * 0.5, bounds.x - size * 0.5);
      vel.current.x = -vel.current.x * 0.6;
    }
    if (p.z + size * 0.5 >= bounds.z || p.z - size * 0.5 <= -bounds.z) {
      p.z = THREE.MathUtils.clamp(p.z, -bounds.z + size * 0.5, bounds.z - size * 0.5);
      vel.current.z = -vel.current.z * 0.6;
    }

    // damp tiny motion
    if (Math.abs(vel.current.x) < 0.01) vel.current.x = 0;
    if (Math.abs(vel.current.z) < 0.01) vel.current.z = 0;
  });

  return (
    <group ref={ref} position={[pos0.x, pos0.y, pos0.z]}>
      {invert && (
        <mesh position={[0, 0, -0.005]} castShadow receiveShadow>
          <planeGeometry args={[size * 1.1, size * 1.1]} />
          <meshStandardMaterial color="#ffffff" roughness={0.9} metalness={0} />
        </mesh>
      )}
      <mesh castShadow>
        <planeGeometry args={[size, size]} />
        <meshStandardMaterial
          map={texture}
          transparent
          roughness={0.7}
          metalness={0}
        />
      </mesh>
    </group>
  );
}

const Section = styled.section`
  padding-left: 220px;
  background: #000000;
  padding-top: 80px;
  padding-bottom: 120px;
  margin-bottom: 200px;
  scroll-margin-top: 84px;

  @media (max-width: 1100px) {
    padding-left: 0;
    margin-bottom: 90px;
    padding-top: 60px;
  }
`;

const Grid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

const Left = styled.div``;
const Right = styled.div``;

const Kicker = styled.h3`
  color: #ffffff;
  font-size: 20px;
  font-weight: 800;
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 420ms ease, transform 420ms ease;
  &[data-visible="1"] {
    opacity: 1;
    transform: translateY(0);
  }
`;

const CanvasWrap = styled.div`
  margin-top: 14px;
  width: 100%;
  height: 280px;
  border: 1px solid #1a1a1b;
  border-radius: 12px;
  background: radial-gradient(1200px 240px at 50% 0%, rgba(255,255,255,0.05), rgba(255,255,255,0) 80%), #0b0b0c;
  overflow: hidden;
`;

const BigTitle = styled.h2`
  color: #ffffff;
  font-weight: 900;
  font-size: clamp(36px, 6vw, 80px);
  line-height: 1;
  margin-top: 8px;
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 420ms ease 80ms, transform 420ms ease 80ms;
  &[data-visible="1"] {
    opacity: 1;
    transform: translateY(0);
  }
`;

const LogoGrid = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
`;

const LogoItem = styled.li`
  background: #0f0f10;
  border: 1px solid #1a1a1b;
  border-radius: 12px;
  padding: 12px 14px;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  transition: opacity 420ms ease, transform 420ms ease, border-color 200ms ease;
  white-space: nowrap;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translateY(${({ $visible }) => ($visible ? "0" : "8px")});

  &:hover {
    transform: translateY(-2px);
    border-color: #2a2a2b;
  }

  img {
    width: 28px;
    height: 28px;
    object-fit: contain;
    flex: 0 0 auto;
  }
  img.invert {
    filter: invert(1);
  }
  span {
    color: #e6e6e6;
    font-size: 14px;
    font-weight: 600;
  }
`;

// Legacy list removed in redesign
