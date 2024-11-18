import styled from "styled-components";
import Logo from "/Logo.svg";

export default function OverHeader() {
  return (
    <>
      <HeaderLayout>
        <img width={40} src={Logo} />
        <List>
          <ListButton>Main</ListButton>
          <ListButton>Project</ListButton>
        </List>
      </HeaderLayout>
    </>
  );
}

const HeaderLayout = styled.div`
  width: 100%;
  padding: 26px 130px;
  display: flex;
  position: fixed;
  z-index: 999;
  align-items:center;
  justify-content:space-between;
`;
const List = styled.div`
  display: flex;
  align-items:center;
  gap:52px;
`;
const ListButton = styled.div`
  color: white;
  font-size:28px;
  font-weight:200;
`;
