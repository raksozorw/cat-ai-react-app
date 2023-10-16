import styled from "styled-components";

export const StyledUploader = styled.div`
  border: 2px solid yellow;
  border-radius: 22px;
  width: 800px;
  padding: 20px;

  @media (max-width: 850px) {
    width: 90%;
  }
`;

export const StyledImagePreview = styled.img`
  width: 200px;
  margin-bottom: 20px;
  border-radius: 22px;
`;

export const StyledImageArea = styled.div`
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0px;
  position: relative;
`;
