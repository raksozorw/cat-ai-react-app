import React, { useCallback, useRef, useState } from "react";
import { styled } from "styled-components";

type Props = {
  disabled: boolean;
  handleImageChange: (file: File | null) => void;
};

interface StyledDropZoneProps {
  draggingOver: boolean;
}

const StyledDropZone = styled.div<StyledDropZoneProps>`
  border: 2px dashed #ccc;
  border-color: ${(props) => (props.draggingOver ? "#26e271" : "")};

  text-align: center;
  padding: 20px;
  cursor: pointer;

  margin-bottom: 20px;

  p {
    margin: 0;
    font-size: 16px;
  }

  input {
    display: none;
  }
`;

export default function DropZone({ disabled, handleImageChange }: Props) {
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

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleImageChange(files[0]);
    }
  };

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = useCallback(() => {
    fileInputRef?.current?.click();
  }, []);

  return (
    <StyledDropZone
      className="drop-zone"
      onDragOver={(e) => handleDragOver(e)}
      onDragLeave={(e) => handleDragLeave(e)}
      onDrop={(e) => handleDrop(e)}
      onClick={handleClick}
      draggingOver={draggingOver}
    >
      <p>Drag &amp; Drop an image here or click to select one</p>
      <input
        type="file"
        id="file-input"
        accept="image/*"
        disabled={disabled}
        ref={fileInputRef}
        onChange={(e) => handleImageChange(e?.target?.files?.[0] || null)}
      />
    </StyledDropZone>
  );
}
