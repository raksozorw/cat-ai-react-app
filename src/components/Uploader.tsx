import { useCallback, useEffect, useState } from "react";
import {
  StyledError,
  StyledImageArea,
  StyledUploader,
} from "./Uploader.styled";
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

const Uploader = () => {
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string>("");

  const { upload, result, loading, uploadError, clearResult } = useUpload();

  const reset = useCallback(() => {
    clearResult();
    setImage(null);
    setError("");
  }, [clearResult]);

  const handleImageChange = useCallback(
    (file: File | null) => {
      reset();
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
        {image ? (
          <ImageLoader url={URL.createObjectURL(image)} reset={reset} />
        ) : (
          <DropZone
            handleImageChange={handleImageChange}
            setError={setError}
            disabled={loading}
          />
        )}
      </StyledImageArea>
      {!result ? (
        <button onClick={handleUpload} disabled={loading || !image}>
          {loading ? "Loading..." : "Evaluate"}
        </button>
      ) : (
        <button onClick={reset}>Reset</button>
      )}

      {loading && <Spinner />}
      {result && <Results result={result} />}
      {error && <StyledError>{error}</StyledError>}
    </StyledUploader>
  );
};

export default Uploader;
