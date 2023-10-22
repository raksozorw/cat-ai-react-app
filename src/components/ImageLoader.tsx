import { useState } from "react";
import Spinner from "./Spinner";
import { styled } from "styled-components";

const StyledImagePreview = styled.img`
  width: 200px;
  max-height: 280px;
  margin-bottom: 20px;
  border-radius: 22px;
`;

type ImageLoaderProps = {
  url: string;
  imageSelected: boolean;
  reset: () => void;
};

const StyledClearButton = styled.button`
  border-radius: 70px;
  position: absolute;
  padding: 5px 10px;
  right: 0px;
`;

const ImageLoader = ({ url, imageSelected, reset }: ImageLoaderProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setIsError(true);
  };

  return (
    <div>
      {imageSelected && (
        <div style={{ position: "relative" }}>
          <StyledClearButton onClick={reset}>X</StyledClearButton>
          {isLoading && <Spinner data-testid="spinner" />}
          {isError && <div>Error loading image</div>}
          {url && !isLoading && !isError && (
            <StyledImagePreview
              src={url}
              alt="Uploaded image preview"
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ImageLoader;
