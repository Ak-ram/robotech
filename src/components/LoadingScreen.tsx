import { useEffect, useState } from 'react';

const LoadingScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const textArray = ["Please, wait", "We are making setup for you", "All things done"];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % textArray.length);
    }, 3333); // Change text every 2 seconds (adjust as needed)

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex items-center justify-center h-48">
      <div className="transition-opacity duration-500" key={currentIndex}>
        {textArray[currentIndex]}
      </div>
    </div>
  );
};

export default LoadingScreen;
