import { render, screen } from "@testing-library/react";
import Results from "../components/Results";
import "@testing-library/jest-dom/extend-expect";

describe("Results Component", () => {
  it("displays the correct prediction and probability when kvarg is predicted", () => {
    const mockResult = {
      prediction: "kvarg",
      probabilities: {
        kvarg: 0.95,
        jalrsberg: 0.05,
      },
    };

    render(<Results result={mockResult} />);

    expect(screen.getByText("kvarg!")).toBeInTheDocument();
    expect(screen.getByText("95%")).toBeInTheDocument();
  });

  it("displays the correct prediction and probability when jarlsberg is predicted", () => {
    const mockResult = {
      prediction: "jarlsberg",
      probabilities: {
        kvarg: 0.5,
        jarlsberg: 0.99,
      },
    };

    render(<Results result={mockResult} />);

    expect(screen.getByText("jarlsberg!")).toBeInTheDocument();
    expect(screen.getByText("99%")).toBeInTheDocument();
  });

  it('displays "Unknown" if the prediction probability is less than 90%', () => {
    const lowProbabilityResult = {
      prediction: "kvarg",
      probabilities: {
        kvarg: 0.85,
        jarlsberg: 0.15,
      },
    };

    render(<Results result={lowProbabilityResult} />);

    expect(screen.getByText("Unknown!")).toBeInTheDocument();
  });
});
