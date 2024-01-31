import React, { useState, useEffect } from 'react';
import gsap from 'gsap';

const AddToCardBtn = () => {
  const [duration] = useState(3000);
  const [svgPath, setSvgPath] = useState({
    y: 20,
    smoothing: 0
  });

  useEffect(() => {
    const buttons = document.querySelectorAll('.button');

    buttons.forEach((button) => {

      const svg = button.querySelector('svg');

      const updateSvgPath = (y, smoothing) => {
        setSvgPath({ y, smoothing });
        if (svgPath.y !== null && svgPath.smoothing !== null) {
          svg!.innerHTML = getPath(svgPath.y, svgPath.smoothing, null);
        }
      };

      updateSvgPath(20, 0);

      button.addEventListener('click', (e) => {
        e.preventDefault();

        if (!button.classList.contains('loading')) {
          button.classList.add('loading');

          gsap.to(svgPath, {
            smoothing: 0.3,
            duration: duration * 0.065 / 1000
          });

          gsap.to(svgPath, {
            y: 12,
            duration: duration * 0.265 / 1000,
            delay: duration * 0.065 / 1000,
            ease: Elastic.easeOut.config(1.12, 0.4)
          });

          setTimeout(() => {
            svg!.innerHTML = getPath(0, 0, [
              [3, 14],
              [8, 19],
              [21, 6]
            ]);
          }, duration / 2);
        }
      });
    });
  }, [duration, svgPath]);

  function getPoint(point, i, a, smoothing) {
    const cp = (current, previous, next, reverse) => {
      const p = previous || current,
        n = next || current,
        o = {
          length: Math.sqrt(Math.pow(n[0] - p[0], 2) + Math.pow(n[1] - p[1], 2)),
          angle: Math.atan2(n[1] - p[1], n[0] - p[0])
        },
        angle = o.angle + (reverse ? Math.PI : 0),
        length = o.length * smoothing;
      return [current[0] + Math.cos(angle) * length, current[1] + Math.sin(angle) * length];
    };

    const cps = cp(a[i - 1], a[i - 2], point, false);
    const cpe = cp(point, a[i - 1], a[i + 1], true);
    return `C ${cps[0]},${cps[1]} ${cpe[0]},${cpe[1]} ${point[0]},${point[1]}`;
  }

  function getPath(update, smoothing, pointsNew) {
    const points = pointsNew ? pointsNew : [
      [4, 12],
      [12, update],
      [20, 12]
    ];

    const d = points.reduce((acc, point, i, a) => i === 0 ? `M ${point[0]},${point[1]}` : `${acc} ${getPoint(point, i, a, smoothing)}`, '');

    return `<path d="${d}" />`;
  }

  return (
    <a href="" className="button">
      <ul>
        <li>Add to cart</li>
        <li>Wait...</li>
        <li>Added</li>
      </ul>
      <div>
        <svg viewBox="0 0 24 24"></svg>
      </div>
    </a>
  );
};

export default AddToCardBtn;
