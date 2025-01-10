import styled from "styled-components";
import Logo from '/Logo.svg'
import Ellipse from '/Ellipse.svg'
export default function OverHeader({scrollTest}) {
  return (
    <>
      <HeaderLayout>
        <List>
          <ListButton>about</ListButton>
          <img src={Ellipse}/>
          <ListButton>project</ListButton>
          <img src={Ellipse}/>
          <LogoIMG src={Logo}/>
          <img src={Ellipse}/>
          <ListButton>skill</ListButton>
          <img src={Ellipse}/>
          <ListButton>archiving</ListButton>
        </List>
      </HeaderLayout>
    </>
  );
}
const LogoIMG = styled.img`
  width: 50px;
  @media (max-width: 600px) {
    width: 40px;
  }
`;
const HeaderLayout = styled.div`
  width: 100%;
  padding: 26px 130px;
  display: flex;
  position: fixed;
  z-index: 999;
  align-items:center;
  justify-content:center;
`;
const List = styled.div`
  display: flex;
  align-items:center;
  gap:71px;
`;
const ListButton = styled.div`
  color: #000000;
  font-size:26px;
  font-weight:200;
`;
