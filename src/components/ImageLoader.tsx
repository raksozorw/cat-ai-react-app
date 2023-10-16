import { useState } from "react";
import { StyledImagePreview } from "./Uploader.styled";
import Spinner from "./Spinner";
import { styled } from "styled-components";

type Props = {
  url: string;
  started: boolean;
  reset: () => void;
};

const StyledClearButton = styled.button`
  border-radius: 70px;
  position: absolute;
  padding: 5px 10px;
  right: 0px;
`;

function ImageLoader({ url, started, reset }: Props) {
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
      {started && (
        <div style={{ position: "relative" }}>
          <StyledClearButton onClick={reset}>X</StyledClearButton>
          {isLoading && <Spinner />}
          {isError && <div>Error loading image</div>}
          {url && !isLoading && !isError && (
            <StyledImagePreview
              src={url}
              alt="Loaded Image"
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default ImageLoader;
