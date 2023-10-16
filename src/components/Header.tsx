import { keyframes, styled } from "styled-components";
import useTypeEffect from "../helpers/useTypeEffect";

const StyledHeader = styled.nav`
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  text-align: left;
  font-size: 1.2rem;
`;

const StyledHeaderContent = styled.div`
  padding: 8px 0px 8px 12px;
`;

const flashAnimation = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const FlashingCursor = styled.span`
  animation: ${flashAnimation} 0.8s alternate infinite;
  width: 1px;
  height: 24px;
  color: var(--positive-color);
  font-weight: 800;
`;

export default function Header() {
  const baseText = "AI Kitten Predictor";

  const text = useTypeEffect(baseText);

  return (
    <StyledHeader>
      <StyledHeaderContent>
        {text} <FlashingCursor>__</FlashingCursor>
      </StyledHeaderContent>
    </StyledHeader>
  );
}
