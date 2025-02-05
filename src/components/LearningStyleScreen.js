// LearningStyleScreen.js
import React from 'react';

const LearningStyleScreen = ({ onSelectStyle }) => {
  return (
    <div className="screen">
      <h2>Discover Your Learning Style</h2>
      <p>
        Every innovator has a unique way of absorbing knowledge. Choose the learning style that best defines your approach.
      </p>
      <div className="option" onClick={() => onSelectStyle('Creative Catalyst')}>
        <h3>The Creative Catalyst</h3>
        <p>Unleash your imagination and let art drive your solutions.</p>
      </div>
      <div className="option" onClick={() => onSelectStyle('Analytical Architect')}>
        <h3>The Analytical Architect</h3>
        <p>Dissect challenges with precision and build solutions with logic.</p>
      </div>
      <div className="option" onClick={() => onSelectStyle('Organized Operator')}>
        <h3>The Organized Operator</h3>
        <p>Structure is your superpower—efficiency and order guide you.</p>
      </div>
      <div className="option" onClick={() => onSelectStyle('Collaborative Conductor')}>
        <h3>The Collaborative Conductor</h3>
        <p>You unite minds and talents to forge groundbreaking innovations.</p>
      </div>
    </div>
  );
};

export default LearningStyleScreen;
