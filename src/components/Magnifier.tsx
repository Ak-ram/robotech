import React, { useState } from "react";

const MagnifierComponent = ({ img }) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [zoomScale, setZoomScale] = useState(0.9);

  const zoomEffect = (e) => {
    const boundingBox = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - boundingBox.left) / boundingBox.width;
    const y = (e.clientY - boundingBox.top) / boundingBox.height;
    setZoomScale(1.3);
    setCoords({ x, y });
  };

  const resetCoords = () => {
    setCoords({ x: 0, y: 0 });
    setZoomScale(1.0);
  };

  return (
    <div
      className="bg-white"
      style={{
        overflow: "hidden",
        position: "relative",
        width: "100%",
        height: "100%",
        transition: "background-color 0.2s ease",
      }}
      onMouseMove={zoomEffect}
      onMouseLeave={resetCoords}
    >
      <img
        style={{
          width: "100%", // Ensure the image fills the container
          height: "100%", // Ensure the image fills the container
          transform: `scale(${zoomScale}) translate(-${coords.x * 50}%, -${coords.y * 50}%)`,
          transformOrigin: "top left",
          transition: "transform 0.2s ease-out",
        }}
        src={img}
        alt="Magnified Image"
        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
          const target = e.target as HTMLImageElement;
          target.src = "https://makeplaceholder.com?text=Broken+Url&size=700x500&tcolor=333333"; // Set placeholder image on error
        }}
      />
    </div>
  );
};

export default MagnifierComponent;
