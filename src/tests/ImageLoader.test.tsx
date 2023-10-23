import { render, screen, fireEvent } from "@testing-library/react";
import ImageLoader from "../components/ImageLoader";
import "@testing-library/jest-dom/extend-expect";

describe("ImageLoader Component", () => {
  it("renders a clear button", () => {
    render(<ImageLoader url="test.jpg" reset={jest.fn()} />);

    expect(screen.getByText("X")).toBeInTheDocument();
  });

  it("displays an error message when image loading fails", () => {
    render(<ImageLoader url="test.jpg" reset={jest.fn()} />);

    fireEvent.error(screen.getByAltText("Uploaded image preview"));

    expect(screen.getByText("Error loading image")).toBeInTheDocument();
  });

  it("displays the uploaded image preview when it loads successfully", () => {
    render(<ImageLoader url="test.jpg" reset={jest.fn()} />);

    fireEvent.load(screen.getByAltText("Uploaded image preview"));

    expect(screen.getByAltText("Uploaded image preview")).toBeInTheDocument();
  });

  it("calls the reset function when the clear button is clicked", () => {
    const resetMock = jest.fn();
    render(<ImageLoader url="test.jpg" reset={resetMock} />);

    const clearButton = screen.getByText("X");
    fireEvent.click(clearButton);

    expect(resetMock).toHaveBeenCalled();
  });
});
