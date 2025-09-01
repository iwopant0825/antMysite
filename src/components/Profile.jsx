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

          <SocialRow>
            <IconBtn
              href="https://www.instagram.com/smallants.0825/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram 열기(새 탭)"
              title="Instagram"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5A5.5 5.5 0 1 1 6.5 13 5.5 5.5 0 0 1 12 7.5zm0 2A3.5 3.5 0 1 0 15.5 13 3.5 3.5 0 0 0 12 9.5zM18 6.25a1.25 1.25 0 1 1-1.25 1.25A1.25 1.25 0 0 1 18 6.25z" fill="currentColor"/>
              </svg>
            </IconBtn>
            <IconBtn
              href="https://github.com/iwopant0825"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub 열기(새 탭)"
              title="GitHub"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.69c-2.78.61-3.37-1.19-3.37-1.19-.46-1.16-1.12-1.47-1.12-1.47-.92-.63.07-.62.07-.62 1.02.07 1.56 1.05 1.56 1.05.9 1.55 2.36 1.1 2.94.84.09-.66.35-1.1.63-1.36-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85 0 1.71.11 2.51.32 1.9-1.29 2.74-1.02 2.74-1.02.56 1.37.21 2.39.11 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.86v2.76c0 .26.18.57.69.48A10 10 0 0 0 12 2z" fill="currentColor"/>
              </svg>
            </IconBtn>
          </SocialRow>

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

const SocialRow = styled.div`
  display: flex;
  gap: 10px;
`;

const IconBtn = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: 1px solid #e0e0e0;
  color: #111;
  background: #fff;
  text-decoration: none;
  transition: background 180ms ease, color 180ms ease, border-color 180ms ease, transform 180ms ease, box-shadow 180ms ease;

  &:hover {
    background: #111214;
    color: #fff;
    border-color: #111214;
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(0,0,0,0.08);
  }

  &:focus-visible {
    outline: 2px solid #5560ff;
    outline-offset: 2px;
  }
`;

const BigTitle = styled.h2`
  color: #000000;
  font-weight: 900;
  font-size: clamp(48px, 8vw, 120px);
  line-height: 0.9;
`;

/* WordsStack styles moved to Immersion section */
