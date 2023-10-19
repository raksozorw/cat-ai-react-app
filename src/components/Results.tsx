import { ModelResponse } from "./Uploader";
import getColorFromValue from "../helpers/getColor";
import { useMemo } from "react";

type Props = {
  result: ModelResponse;
};

export default function Results({ result }: Props) {
  const prediction = useMemo(() => {
    if (result.probabilities[result.prediction] < 90) {
      return "Unknown";
    } else {
      return result.prediction;
    }
  }, [result]);

  // TO DO: make styled component
  return (
    <div
      style={{
        backgroundColor: "#ccc",
        padding: "20px 50px",
        margin: "auto",
        marginTop: "40px",
        borderRadius: "22px",
        width: "240px",
        textAlign: "left",
      }}
    >
      <h2 style={{ display: "flex", justifyContent: "space-between" }}>
        Kitten:{" "}
        <span style={{ textTransform: "capitalize", fontWeight: "400" }}>
          {prediction}
        </span>
      </h2>
      <h2 style={{ display: "flex", justifyContent: "space-between" }}>
        Probability:{" "}
        <span
          style={{
            fontWeight: "400",
            color: getColorFromValue(
              result.probabilities[result.prediction] * 100
            ),
          }}
        >
          {Math.floor(result.probabilities[result.prediction] * 100)}%
        </span>
      </h2>
    </div>
  );
}
