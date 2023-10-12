import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { StyledUploader } from "./Uploader.styled";
import Spinner from "./Spinner";
import ImageLoader from "./ImageLoader";
import Results from "./Results";
import useUpload from "../helpers/useUpload";
import DropZone from "./DropZone";

type Props = {
  title: string;
};

export type ModelResponse = {
  prediction: string;
  probabilities: { [key: string]: number };
};

export default function Uploader({ title }: Props) {
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

  return (
    <StyledUploader>
      <h1>{title}</h1>

      <ImageLoader
        started={imageUploadStarted}
        url={image ? URL.createObjectURL(image) : ""}
        reset={reset}
      />

      {!image && (
        <DropZone handleImageChange={handleImageChange} disabled={loading} />
      )}

      {!result ? (
        <button onClick={handleUpload} disabled={loading || !image}>
          {loading ? "Loading..." : "Evaluate"}
        </button>
      ) : (
        <button onClick={reset}>Reset</button>
      )}

      {/* <button onClick={reset}>Reset</button> */}

      {loading && <Spinner />}
      {result && <Results result={result} />}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </StyledUploader>
  );
}
