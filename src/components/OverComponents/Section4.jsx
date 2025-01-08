import styled from "styled-components";

export default function Section4() {
  return (
    <Layout>
      <Title>TEST4</Title>
    </Layout>
  );
}
const Layout = styled.div`
  width: 100%;
  height: 100dvh;
`;
const Title = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  font-size: 40px;
`;
