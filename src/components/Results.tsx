import { ModelResponse } from "./Uploader";
import getColorFromValue from "../helpers/getColor";

type Props = {
  result: ModelResponse;
};

export default function Results({ result }: Props) {
  return (
    <div>
      <h2>
        Kitten:{" "}
        <span style={{ textTransform: "capitalize" }}>{result.prediction}</span>
      </h2>
      <h2>
        Probability:{" "}
        <span
          style={{
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
