import React, { useRef, useEffect } from 'react';
import initGame from './logic';

export default function Arena() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      initGame(canvasRef.current);
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={512}
      height={512}
      className="border-4 border-yellow-400 rounded"
    />
  );
}
