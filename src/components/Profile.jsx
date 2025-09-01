import styled from "styled-components";
import Polygon from "/Polygon.svg";
import { useEffect, useRef, useState } from "react";
import { observeOnce } from "@/utils/dom";

export default function Profile() {
  const sectionRef = useRef(null);
  const [typedText, setTypedText] = useState("");
  const [hasStarted, setHasStarted] = useState(false);

  const fullText =
    "저는 사용자 경험을 최우선으로 생각하는 프론트엔드 개발자입니다. 깔끔한 코드와 감각적인 디자인을 결합해 매끄럽고 반응형인 웹 인터페이스를 구현하는 데 집중합니다. React, Three.js, Tailwind 등 다양한 최신 기술을 활용하며, 단순한 화면을 넘어서 사용자와 소통하는 경험을 설계하는 것을 목표로 합니다. 항상 배우고 성장하며, 새로운 시도를 통해 더 나은 웹을 만들어가는 개발자가 되고자 합니다.";

  useEffect(() => {
    if (hasStarted) return;
    return observeOnce(sectionRef.current, () => setHasStarted(true), {
      root: null, rootMargin: "0px 0px -20% 0px", threshold: 0.2
    });
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    if (typedText.length >= fullText.length) return;
    let i = typedText.length;
    const step = () => {
      i += 1;
      setTypedText(fullText.slice(0, i));
      if (i < fullText.length) {
        timer = window.setTimeout(step, 10);
      }
    };
    let timer = window.setTimeout(step, 10);
    return () => window.clearTimeout(timer);
  }, [hasStarted, typedText, fullText]);

  return (
    <Section id="profile" tabIndex={-1} ref={sectionRef}>
      <Grid>
        <RightCopy>
          <StampRow>
            <Stamp data-visible={hasStarted ? "1" : "0"}>Profile</Stamp>
          </StampRow>
          <Kicker data-visible={hasStarted ? "1" : "0"}>개발자 차호림</Kicker>

          <TypeWrap>
            <Sizer aria-hidden="true">{fullText}</Sizer>
            <TypeParagraph aria-label="소개 문장 타이핑">
              {typedText}
            </TypeParagraph>
          </TypeWrap>

          {/* WordsStack moved into Immersion section */}
        </RightCopy>
      </Grid>
    </Section>
  );
}

const Section = styled.section`
  padding-left: 220px;
  background: #ffffff;
  padding-top: 80px;
  padding-bottom: 220px;
  scroll-margin-top: 84px;

  @media (max-width: 860px) {
    padding-left: 0;
    padding-top: 40px;
  }
`;

const Grid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: 1.1fr 1.2fr;
  gap: 32px;
  align-items: start;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

const RightCopy = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const Kicker = styled.h3`
  color: #000000;
  font-size: 24px;
  font-weight: 800;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 480ms ease, transform 480ms ease;
  will-change: opacity, transform;

  &[data-visible="1"] {
    opacity: 1;
    transform: translateY(0);
    transition-delay: 120ms;
  }
`;

const Paragraph = styled.p`
  color: #666;
  line-height: 1.6;
`;

const TypeWrap = styled.div`
  position: relative;
`;

const Sizer = styled(Paragraph)`
  visibility: hidden;
  pointer-events: none;
`;

const TypeParagraph = styled(Paragraph)`
  white-space: pre-wrap;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;

  &::after {
    content: "";
    display: inline-block;
    width: 1px;
    height: 1em;
    background: #000;
    margin-left: 2px;
    animation: blink 1s steps(2, start) infinite;
    vertical-align: -0.1em;
  }

  @keyframes blink {
    to {
      visibility: hidden;
    }
  }
`;

const StampRow = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  margin: 12px 0 8px;
`;

const Stamp = styled.div`
  color: #000000;
  font-weight: 800;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 480ms ease, transform 480ms ease;
  will-change: opacity, transform;

  &[data-visible="1"] {
    opacity: 1;
    transform: translateY(0);
  }
`;

const BigTitle = styled.h2`
  color: #000000;
  font-weight: 900;
  font-size: clamp(48px, 8vw, 120px);
  line-height: 0.9;
`;

/* WordsStack styles moved to Immersion section */
