import styled from "styled-components";
export default function OverHeader({scrollTest}) {
  return (
    <>
      <HeaderLayout>
        <List>
          <ListButton>{scrollTest}</ListButton>
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
  color: #000000;
  font-size:28px;
  font-weight:200;
`;
