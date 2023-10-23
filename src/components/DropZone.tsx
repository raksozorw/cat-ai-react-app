import React, { useCallback, useRef, useState } from "react";
import { styled } from "styled-components";

type DropZoneProps = {
  disabled: boolean;
  handleImageChange: (file: File | null) => void;
  setError: (message: string) => void;
};

type StyledDropZoneProps = {
  $isDraggingOver: boolean;
};

const StyledDropZone = styled.div<StyledDropZoneProps>`
  border: 2px dashed #ccc;
  border-color: ${(props) => (props.$isDraggingOver ? "#26e271" : "")};
  border-radius: 22px;

  text-align: center;
  padding: 60px 70px;
  cursor: pointer;

  margin: 60px 0px 20px 0px;

  p {
    margin: 0;
    font-size: 1.1rem;
  }

  input {
    display: none;
  }
`;

const StyledInfoMsg = styled.p`
  font-size: 0.8rem;
  margin-top: 10px;
`;

const DropZone = ({ disabled, handleImageChange, setError }: DropZoneProps) => {
  const [draggingOver, setDraggingOver] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    setDraggingOver(true);
    e.preventDefault();
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    setDraggingOver(false);
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    setDraggingOver(false);

    e.preventDefault();

    const droppedFile = e.dataTransfer?.files?.[0];

    handleFile(droppedFile);
  };

  const handleFile = useCallback(
    (selectedFile: File | null) => {
      if (selectedFile) {
        if (selectedFile.type.startsWith("image/jpeg")) {
          handleImageChange(selectedFile);
        } else {
          setError("Invalid file type - image must be a jpeg.");
        }
      } else {
        setError("");
      }
    },
    [handleImageChange, setError]
  );

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e?.target?.files?.[0];

      handleFile(selectedFile || null);
    },
    [handleFile]
  );

  // necessary ref for creating a custom drop area
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = useCallback(() => {
    fileInputRef?.current?.click();
  }, []);

  return (
    <StyledDropZone
      data-testid="dropzone"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      $isDraggingOver={draggingOver}
      role="button" // following properties for accessbilitiy
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleClick();
        }
      }}
    >
      <p>Drag &amp; drop an image here or click to select one</p>
      <StyledInfoMsg>Image must be jpeg format</StyledInfoMsg>
      <input
        aria-label="File input"
        type="file"
        id="file-input"
        accept="image/jpeg"
        disabled={disabled}
        ref={fileInputRef}
        onChange={onChange}
      />
    </StyledDropZone>
  );
};

export default DropZone;
