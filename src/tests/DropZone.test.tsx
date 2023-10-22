import DropZone from "../components/DropZone";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe("DropZone", () => {
  it("renders the dropzone UI", () => {
    render(
      <DropZone
        disabled={false}
        handleImageChange={jest.fn()}
        setError={jest.fn()}
      />
    );
    // can't get the text of children of StyledDropZone for some reason, need to investigate
    expect(screen.getByTestId("dropzone")).toBeInTheDocument();
  });
});
