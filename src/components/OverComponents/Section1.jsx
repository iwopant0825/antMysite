import styled from "styled-components";
import Text from "../Text";
import Polygon from "/Polygon.svg";

export default function Section1() {
  return (
    <Layout>
      <CenterSection>
        <Choice>
          <Text size={29.328}>관점의 변화</Text>
          <ChoiceBox>
            <Text size={29.328} family="Light">
              developer
            </Text>
          </ChoiceBox>
          <ChoiceBox>
            <Text size={29.328} family="Light">
              designer
            </Text>
          </ChoiceBox>
          <Text size={29.328} family="Light">
            choice this
          </Text>
        </Choice>

        <Line />
        <CenterBox />
        <Line />

        <Skill>
          <Text size={29.328}>html</Text>
          <Text size={29.328}>css</Text>
          <Text size={29.328}>javascript</Text>
          <Text size={29.328}>threejs</Text>
          <Text size={29.328}>reactjs</Text>
          <Text size={29.328}>react three fiber</Text>
          <Text size={29.328}>react three drei</Text>
          <Text size={29.328}>react native</Text>
          <Text size={29.328}>nodejs</Text>
          <Text size={29.328}>mysql</Text>
        </Skill>
      </CenterSection>
      <Name>
        <PolygonIMG src={Polygon} />
        <Text size={52.45} family="Light">
          FE DEVELOPER{" "}
          <Text size={52.45} family="Regular">
            CHAHORIM
          </Text>
        </Text>
        <Text size={52.45} family="Light">
          개발자 차호림
        </Text>
      </Name>
    </Layout>
  );
}
const Layout = styled.div`
  width: 100%;
  height: 100dvh;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: center;
`;
const PolygonIMG = styled.img`
  width: 20px;
  margin-bottom: 30px;
  @media (max-width: 600px) {
    width: 40px;
  }
`;
const Name = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  margin-bottom: 50px;
  text-align: center;
`;
const CenterSection = styled.div`
  padding: 0px 10%;
  display: flex;
  width: 100%;
  max-width: 2000px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 100px;
`;

const Choice = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  align-items: center;
`;
const ChoiceBox = styled.div`
  display: flex;
  padding: 0px 42px;
  align-items: center;
  background-color: white;
  width: 213px;
  height: 60px;
  border-radius: 3px;
  border: 1px solid #000;
`;

const Skill = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const CenterBox = styled.div`
  width: 507.095px;
  height: 434px;
`;

const Line = styled.div`
  width: 10%;
  height: 1px;
  background-color: #000;
`;
