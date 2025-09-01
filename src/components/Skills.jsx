import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { observeOnce } from "@/utils/dom";

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
