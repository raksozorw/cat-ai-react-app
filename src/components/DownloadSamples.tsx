import { styled } from "styled-components";

const StyledWrapper = styled.div`
  margin-top: 100px;
  font-size: 0.8rem;
`;

const StyledLinksWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 50px;
  a {
    font-size: 1.1rem;
  }
`;

export default function DownloadSamples() {
  return (
    <StyledWrapper>
      <span>
        Want to try, but don't have Kvarg or Jarlsberg in the room? Download
        sample photos here:
      </span>
      <StyledLinksWrapper>
        <a href="src/assets/kvarg.JPG" download="kvarg.jpg">
          Kvarg
        </a>
        <a href="src/assets/jarlsberg.JPG" download="jarlsberg.jpg">
          Jarlsberg
        </a>
      </StyledLinksWrapper>
    </StyledWrapper>
  );
}
