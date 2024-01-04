import { useEffect } from 'react';
import confetti from 'canvas-confetti';

const ConfettiComponent: React.FC = () => {
  const duration = 4 * 1000,
    animationEnd = Date.now() + duration,
    defaults = { startVelocity: 30, spread: 360, ticks: 20, zIndex: 0 };

  function randomInRange(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  useEffect(() => {
    const interval: NodeJS.Timeout = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      // since particles fall down, start a bit higher than random
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        })
      );
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        })
      );
    }, 250);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
  }); // Empty dependency array ensures the effect runs once on mount

  return <div className="confetti-container"></div>;
};

export default ConfettiComponent;
