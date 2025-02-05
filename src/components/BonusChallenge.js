// BonusChallenge.js
import React, { useEffect, useRef, useState } from 'react';

const BonusChallenge = ({ onComplete, onSkip }) => {
  const canvasRef = useRef(null);
  const [gameActive, setGameActive] = useState(true);
  const [orb, setOrb] = useState({ x: 50, y: 150, radius: 25, vx: 4, vy: 3 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const drawOrb = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
      ctx.fillStyle = "#0d6efd";
      ctx.shadowColor = "#0d6efd";
      ctx.shadowBlur = 20;
      ctx.fill();
      ctx.closePath();
    };

    const updateOrb = () => {
      setOrb(prev => {
        let { x, y, radius, vx, vy } = prev;
        x += vx;
        y += vy;
        if (x + radius > canvas.width || x - radius < 0) vx *= -1;
        if (y + radius > canvas.height || y - radius < 0) vy *= -1;
        return { x, y, radius, vx, vy };
      });
    };

    const bonusLoop = () => {
      if (!gameActive) return;
      updateOrb();
      drawOrb();
      animationFrameId = requestAnimationFrame(bonusLoop);
    };

    bonusLoop();
    return () => cancelAnimationFrame(animationFrameId);
  }, [orb, gameActive]);

  const handleCanvasClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const distance = Math.sqrt((mouseX - orb.x) ** 2 + (mouseY - orb.y) ** 2);
    if (distance < orb.radius) {
      setGameActive(false);
      onComplete();
    }
  };

  return (
    <div className="screen">
      <h2>Bonus Challenge: Catch the Orb of Insight</h2>
      <p>
        Prove your digital dexterity—click the glowing orb as it darts across the screen to unlock secret wisdom!
      </p>
      <div id="bonusGameContainer" style={{ margin: '0 auto', maxWidth: '600px' }}>
        <canvas
          ref={canvasRef}
          width={600}
          height={300}
          onClick={handleCanvasClick}
          style={{ border: '2px solid #0d6efd', borderRadius: '8px' }}
        ></canvas>
      </div>
      <p>
        If you're ready to skip this extra trial, click{" "}
        <button style={{ fontSize: '16px', padding: '5px 10px' }} onClick={onSkip}>
          Skip Bonus
        </button>
      </p>
    </div>
  );
};

export default BonusChallenge;
