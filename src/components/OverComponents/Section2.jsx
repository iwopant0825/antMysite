import styled from "styled-components";
import Text from "../Text";
import Polygon from "/Polygon.svg";
export default function Section2() {
  return (
    <Layout>
      <TitleSection>
        <Text size={56.444}>차호림</Text>
        <Text size={64.773} family="Regular">CHAHORIM</Text>
        <Text size={39.045}>경험과 성장을 목표로, 끊임없이 도전하는 웹 프론트엔드 개발자입니다.</Text>
      </TitleSection>
      <InfoSection>
        <InfoeBox>
          <Text size={44.03}>학력</Text>
          <Text family="Light" size={30.97}>선린인터넷고등학교 118기</Text>
        </InfoeBox>
        <InfoeBox>
          <Text size={44.03}>이메일</Text>
          <Text family="Light" size={30.97}>ccodingpy0825@gmail.com</Text>
        </InfoeBox>
        <InfoeBox>
          <Text size={44.03}>연락처</Text>
          <Text family="Light" size={30.97}>010-9829-9874</Text>
        </InfoeBox>
      </InfoSection>
      <TypeSection>

      </TypeSection>
    </Layout>
  );
}
const Layout = styled.div`
  width: 100%;
  height: 100dvh;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  gap:93px;
`;
const TitleSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction:column;
  align-items:center;
  gap:8px;
`;
const InfoSection = styled.div`
  padding:0px 83px;
  width: 100%;
  gap:57px;
  display: flex;
`;
const TypeSection = styled.div`
  display: flex;
`;
const InfoeBox = styled.div`
  display: flex;
  flex-direction:column;
  gap:12px;
  align-items: center;
  justify-content:center;
  background-color: white;
  width: 100%;
  height: 234px;
  border: 1px solid #000;
`;

