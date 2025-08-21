import styled from "styled-components";
import { useEffect, useRef, useState } from "react";

export default function Timeline() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setVisible(true);
        });
      },
      { root: null, rootMargin: "0px 0px -20% 0px", threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const items = [
    {
      date: "2023",
      title: "선린인터넷고등학교 입학",
      desc: "선린인터넷고등학교에 118기로 입학함.",
    },
    {
      date: "2023",
      title: "소프트웨어 나눔축제 참여",
      desc: "선린인터넷고등학교 소프트웨어 나눔축제에 개발자, 집필자, 강의자로 참여함.",
    },
    {
      date: "2024",
      title: "TAPIE 부장 활동",
      desc: "웹앱 전공 동아리 TAPIE의 1기 부장으로서 예산 관리, 행사 기획, 홍보 활동 등을 하며 42명의 부원과 함께 활동함.",
    },
    {
      date: "2024",
      title: "STA+C 2024 참여",
      desc: "Smart Teen App Challenge 2024에 참여하여 결선까지 진출하고 가작상을 받음.",
    },
    {
      date: "2024",
      title: "동아출판 외주",
      desc: "동아출판 교과서에 수록될 3D 웹을 개발함.",
    },
    {
      date: "2024",
      title: "(주)뉴로서킷 용역 개발 및 디자인",
      desc: "(주)뉴로서킷과 계약을 맺고 3개의 프로젝트를 개발 및 디자인함.",
    },
    {
      date: "2025",
      title: "기후과학클래스 3기 참여",
      desc: "환경재단이 주최하는 청소년 대상 캠프인 기후과학클래스 3기에 참여함.",
    },
    {
      date: "2025",
      title: "국제청소년 한국유네스코유산알리기 아이디어대회 참여",
      desc: "국제청소년 한국유네스코유산알리기 아이디어대회에 참여하여 SW 첨단기술 부문에서 문화유산국민신탁 이사장상을 받음.",
    },
  ];

  const LINE_MS = 500;
  const ITEM_STAGGER = 100;

  return (
    <Section id="timeline" tabIndex={-1} ref={sectionRef}>
      <Container>
        <Kicker data-visible={visible ? "1" : "0"}>Timeline</Kicker>
        <TimelineWrap>
          <Line aria-hidden="true" $visible={visible} />
          <List>
            {items.map((it, i) => (
              <Item
                key={i}
                $visible={visible}
                style={{ transitionDelay: `${LINE_MS + i * ITEM_STAGGER}ms` }}
              >
                <Dot aria-hidden="true" />
                <Content
                  $visible={visible}
                  style={{
                    transitionDelay: `${LINE_MS + i * ITEM_STAGGER + 80}ms`,
                  }}
                >
                  <Date>{it.date}</Date>
                  <Title>{it.title}</Title>
                  <Desc>{it.desc}</Desc>
                </Content>
              </Item>
            ))}
          </List>
        </TimelineWrap>
      </Container>
    </Section>
  );
}

const Section = styled.section`
  padding-left: 220px;
  background: #ffffff;
  padding-top: 80px;
  padding-bottom: 200px;
  scroll-margin-top: 84px;

  @media (max-width: 1100px) {
    padding-left: 0;
    padding-top: 60px;
  }
`;

const Container = styled.div`
  max-width: 760px;
  margin: 0 auto;
  padding: 0 24px;
`;

const TimelineWrap = styled.div`
  position: relative;
  margin-top: 16px;
`;

const Kicker = styled.h3`
  color: #000000;
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

const Line = styled.div`
  position: absolute;
  left: 14px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #e0e2e6;
  transform-origin: top;
  transform: scaleY(${({ $visible }) => ($visible ? 1 : 0)});
  transition: transform 500ms cubic-bezier(0.2, 0.7, 0.2, 1);
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 18px;
`;

const Item = styled.li`
  position: relative;
  display: grid;
  grid-template-columns: 28px 1fr;
  gap: 14px;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translateY(${({ $visible }) => ($visible ? "0" : "8px")});
  transition: opacity 420ms ease, transform 420ms ease;
`;

const Dot = styled.span`
  width: 14px;
  height: 14px;
  background: #111214;
  border: 2px solid #111214;
  border-radius: 0; /* 각진 점 */
  position: relative;
  top: 4px;
`;

const Content = styled.div`
  border: 1px solid #d9d9dc;
  border-radius: 0; /* 각진 카드 */
  background: #fff;
  padding: 14px 16px;
  clip-path: ${({ $visible }) =>
    $visible ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)"};
  transition: clip-path 520ms cubic-bezier(0.2, 0.7, 0.2, 1);
`;

const Date = styled.div`
  color: #6b6f76;
  font-size: 12px;
  margin-bottom: 4px;
`;

const Title = styled.h4`
  color: #0b0c0e;
  font-weight: 800;
`;

const Desc = styled.p`
  color: #3b3f45;
  line-height: 1.6;
  margin-top: 4px;
`;
