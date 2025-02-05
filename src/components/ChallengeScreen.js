import React from 'react';

const ChallengeScreen = ({ onSelectChallenge }) => {
  return (
    <div className="screen">
      <h2>Select Your Adventure Challenge</h2>
      <p>
        Every hero faces challenges that test their skills. Which challenge sparks your curiosity?
      </p>
      <div className="option" onClick={() => onSelectChallenge('Puzzle Master')}>
        <h3>Puzzle Master</h3>
        <p>Solve intricate puzzles and unravel digital mysteries.</p>
      </div>
      <div className="option" onClick={() => onSelectChallenge('Physics Pioneer')}>
        <h3>Physics Pioneer</h3>
        <p>Explore the laws of nature through dynamic simulations.</p>
      </div>
      <div className="option" onClick={() => onSelectChallenge('Time Tactician')}>
        <h3>Time Tactician</h3>
        <p>Optimize processes and race against the clock.</p>
      </div>
      <div className="option" onClick={() => onSelectChallenge('Team Strategist')}>
        <h3>Team Strategist</h3>
        <p>Lead collaborative missions where collective genius prevails.</p>
      </div>
    </div>
  );
};

export default ChallengeScreen;
