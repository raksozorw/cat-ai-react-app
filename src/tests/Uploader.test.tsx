import Uploader from "../components/Uploader";
import { render, screen } from "@testing-library/react";
import useUpload from "../helpers/useUpload";
import "@testing-library/jest-dom/extend-expect";

jest.mock("../helpers/useUpload");

const mockUseUpload = useUpload as jest.MockedFunction<typeof useUpload>;

describe("Uploader Component", () => {
  it("renders the component with initial UI elements", () => {
    mockUseUpload.mockReturnValue({
      upload: jest.fn(),
      result: null,
      loading: false,
      uploadError: "",
      clearResult: jest.fn(),
    });

    render(<Uploader />);

    // check for the button:
    expect(screen.getByText("Evaluate")).toBeInTheDocument();
  });

  it('displays "Loading..." when uploading', () => {
    mockUseUpload.mockReturnValue({
      upload: jest.fn(),
      result: null,
      loading: true,
      uploadError: "",
      clearResult: jest.fn(),
    });

    render(<Uploader />);

    // Check if the component displays "Loading..." when uploading
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("displays an error message when upload fails", () => {
    const errorMessage = "Upload failed. Please try again.";
    mockUseUpload.mockReturnValue({
      upload: jest.fn(),
      result: null,
      loading: false,
      uploadError: errorMessage,
      clearResult: jest.fn(),
    });

    render(<Uploader />);

    // Check if the component displays the error message
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
