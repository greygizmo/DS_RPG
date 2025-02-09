import React from 'react';

const MotivationScreen = ({ onSelectMotivation, onBack }) => {
  return (
    <div className="screen">
      <h2>Discover Your Inner Drive</h2>
      <p>Every innovator is fueled by a unique passion. What inspires you the most?</p>
      <div className="option" onClick={() => onSelectMotivation('Creative Expression')}>
        <h3>Creative Expression</h3>
        <p>I am inspired by art, design, and the beauty of innovation.</p>
      </div>
      <div className="option" onClick={() => onSelectMotivation('Analytical Rigor')}>
        <h3>Analytical Rigor</h3>
        <p>Logic and problem-solving energize me to explore new frontiers.</p>
      </div>
      <div className="option" onClick={() => onSelectMotivation('Efficiency & Order')}>
        <h3>Efficiency & Order</h3>
        <p>Precision, structure, and seamless systems drive my ambition.</p>
      </div>
      <div className="option" onClick={() => onSelectMotivation('Collaboration & Teamwork')}>
        <h3>Collaboration & Teamwork</h3>
        <p>Great achievements come when creative minds unite.</p>
      </div>
      <button className="back-button" onClick={onBack}>Back</button>
    </div>
  );
};

export default MotivationScreen;
