import { styled } from "styled-components";

const StyledSpinner = styled.span`
  margin: 60px 0px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  border: 10px solid transparent;
  box-sizing: border-box;
  animation: animloader 1s linear infinite alternate;

  @keyframes animloader {
    0% {
      border-color: white transparent transparent transparent;
    }
    33% {
      border-color: white white transparent transparent;
    }
    66% {
      border-color: white white white transparent;
    }
    100% {
      border-color: white white white white;
    }
  }
`;

export default function Spinner() {
  return (
    <div>
      <StyledSpinner />;
    </div>
  );
}
