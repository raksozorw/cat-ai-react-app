import { ModelResponse } from "./Uploader";
import getColorFromValue from "../helpers/getColor";
import { useMemo } from "react";
import { styled } from "styled-components";

const StyledResults = styled.div`
  background-color: #ccc;
  padding: 20px 50px;
  margin: auto;
  margin-top: 40px;
  border-radius: 22px;
  width: 240px;
  @media (max-width: 850px) {
    width: 160px;
    padding: 20px 30px;

    h2 {
      font-size: 1rem;
    }
  }
  text-align: left;
`;

const StyledHeader = styled.h2`
  display: flex;
  justify-content: space-between;
`;

type ResultsProps = {
  result: ModelResponse;
};

const Results = ({ result }: ResultsProps) => {
  const percentPrediction = Math.floor(
    result.probabilities[result.prediction] * 100
  );

  const threshold = 90; // 90 is fairly arbitrary, mostly from my own tests on how accurate the current model is
  //TODO: make slider for user to decide threshold

  const prediction = useMemo(() => {
    if (percentPrediction < threshold) {
      return "Unknown";
    } else {
      return result.prediction;
    }
  }, [result, percentPrediction]);

  return (
    <StyledResults>
      <StyledHeader>
        Kitten:{" "}
        <span style={{ textTransform: "capitalize", fontWeight: "400" }}>
          {prediction + "!"}
        </span>
      </StyledHeader>
      {percentPrediction > threshold && (
        <StyledHeader>
          Probability:{" "}
          <span
            style={{
              fontWeight: "400",
              color: getColorFromValue(
                result.probabilities[result.prediction] * 100
              ),
            }}
          >
            {percentPrediction}%
          </span>
        </StyledHeader>
      )}
    </StyledResults>
  );
};

export default Results;
