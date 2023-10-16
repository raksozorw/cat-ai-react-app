import { useCallback, useEffect, useState } from "react";
import { StyledImageArea, StyledUploader } from "./Uploader.styled";
import Spinner from "./Spinner";
import ImageLoader from "./ImageLoader";
import Results from "./Results";
import useUpload from "../helpers/useUpload";
import DropZone from "./DropZone";
import useTypeEffect from "../helpers/useTypeEffect";
import { FlashingCursor } from "./Header";

export type ModelResponse = {
  prediction: string;
  probabilities: { [key: string]: number };
};

export default function Uploader() {
  const [image, setImage] = useState<File | null>(null);
  const [imageUploadStarted, setImageUploadStarted] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const { upload, result, loading, uploadError, resetResult } = useUpload();

  const reset = useCallback(() => {
    resetResult();
    setImage(null);
    setImageUploadStarted(false);
    setError("");
  }, [resetResult]);

  const handleImageChange = useCallback(
    (file: File | null) => {
      reset();
      setImageUploadStarted(true);
      setImage(file);
      setError("");
    },
    [reset]
  );

  const handleUpload = () => {
    upload(image);
  };

  useEffect(() => {
    setError(uploadError);
  }, [uploadError]);

  const description = useTypeEffect(
    " you believe to be Kvarg or Jarlsberg to confirm it is indeed either Kvarg or Jarlsberg"
  );

  return (
    <StyledUploader>
      <h1>Uploader</h1>
      <p>
        Upload an image{description} <FlashingCursor>_</FlashingCursor>
      </p>
      <StyledImageArea>
        <ImageLoader
          started={imageUploadStarted}
          url={image ? URL.createObjectURL(image) : ""}
          reset={reset}
        />
        {!image && (
          <DropZone handleImageChange={handleImageChange} disabled={loading} />
        )}
      </StyledImageArea>
      {!result ? (
        <button
          data-testid="eval-button"
          onClick={handleUpload}
          disabled={loading || !image}
        >
          {loading ? "Loading..." : "Evaluate"}
        </button>
      ) : (
        <button onClick={reset}>Reset</button>
      )}

      {loading && <Spinner />}
      {result && <Results result={result} />}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </StyledUploader>
  );
}
