import { Children } from "react"
import styled from "styled-components";

export default function Text({children, size = 10, family = "Thin"}) {
    return (
        <TextStyle size={size} $family={family}>{children}</TextStyle>
    )
}

const TextStyle = styled.span`
  font-size: ${({ size }) => size}px;
  font-family: ${({ $family }) => `Pretendard-${$family}`};
`;