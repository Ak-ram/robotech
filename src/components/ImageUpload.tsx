import React, { useState, DragEvent } from 'react';

interface ImageUploadProps {
  onImageChange: (index: number, imageUrl: string | null) => void;
  onInputChange: (e:any,key:string)=> void;
  index: number;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onInputChange,onImageChange, index }) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    // Add visual indication that the drop is allowed (e.g., change background color)
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    // Remove the visual indication on drag leave
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const file = (e.dataTransfer.files[0] as File) || null;
    if (file) {
      // Handle the dropped file (e.g., upload or display)
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
      onImageChange(index, imageUrl);
    }
  };

  return (
    <div
      className="drop-zone"
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {uploadedImage ? (
        <img width={50} height={50} src={uploadedImage} alt={`Uploaded${index}`} className="uploaded-image" />
      ) : (
        <p>Drag & Drop an image here or click to select</p>
      )}
      <input
        type="file"
        id={`file-input-${index}`}
        accept="image/*"
        style={{ display: 'none' }}
        onChange={(e) => {
          const file = (e.target.files && e.target.files[0]) || null;
          if (file) {
            const imageUrl = URL.createObjectURL(file);
            setUploadedImage(imageUrl);
            onImageChange(index, imageUrl);
            onInputChange(e,imageUrl)
          }
        }}
      />
      <label htmlFor={`file-input-${index}`} className="upload-button">
        Select Image
      </label>
    </div>
  );
};
export default ImageUpload