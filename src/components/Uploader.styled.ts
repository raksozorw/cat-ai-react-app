import styled from "styled-components";

export const StyledUploader = styled.div`
  margin-top: 30px;
  border: 2px solid yellow;
  border-radius: 22px;
  width: 800px;
  padding: 20px;

  h1 {
    font-size: 2.5rem;
  }
  @media (max-width: 850px) {
    width: 90%;
  }
`;

export const StyledImageArea = styled.div`
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 40px 0px 30px 0px;
  position: relative;
`;

export const StyledError = styled.div`
  color: red;
  margin-top: 20px;
`;
