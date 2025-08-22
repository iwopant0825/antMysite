import styled, { keyframes } from "styled-components";

export default function Loading({ done = false }) {
  return (
    <Wrap aria-hidden={!done} style={{ opacity: done ? 0 : 1, pointerEvents: done ? 'none' : 'auto' }}>
      <Inner>
        <Logo>
          <svg width="140" height="138" viewBox="0 0 70 69" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.3544 1.24966V59.2005H69.6097" stroke="currentColor" strokeWidth="5.92086"/>
            <path d="M3.00012 14.4968L54.1017 66.6967" stroke="currentColor" strokeWidth="5.92086"/>
            <circle cx="47.1419" cy="24.1779" r="6.47221" fill="currentColor" stroke="currentColor" strokeWidth="6.41793"/>
          </svg>
        </Logo>
        <Text>loading...</Text>
        <Bar />
      </Inner>
    </Wrap>
  );
}

const draw = keyframes`
  from { stroke-dashoffset: 420; }
  to { stroke-dashoffset: 0; }
`;

const fade = keyframes`
  to { opacity: 0; visibility: hidden; }
`;

const Wrap = styled.div`
  position: fixed;
  inset: 0;
  display: grid; /* 로고를 정확히 화면 정중앙에 */
  place-items: center;
  background: #ffffff;
  z-index: 9999;
  transition: opacity .5s ease;
`;

const Inner = styled.div`
  display: grid;
  justify-items: center;
  gap: 10px;
`;

const Logo = styled.div`
  color: #111;
  svg path, svg circle {
    stroke-dasharray: 420;
    stroke-dashoffset: 420;
    animation: ${draw} 2.8s cubic-bezier(.2,.7,.2,1) forwards;
  }
`;

const pulse = keyframes`
  0% { transform: scaleX(0.1); opacity: .2; }
  50% { transform: scaleX(1); opacity: .9; }
  100% { transform: scaleX(0.1); opacity: .2; }
`;

const Bar = styled.div`
  width: 120px;
  height: 3px;
  background: #111;
  margin-top: 16px;
  transform-origin: left center;
  animation: ${pulse} 1.2s ease-in-out infinite;
`;

const Text = styled.div`
  color: #111;
  font-size: 13px;
  letter-spacing: .08em;
`;


