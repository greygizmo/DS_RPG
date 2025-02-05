import React from 'react';

const WelcomeScreen = ({ onStart }) => {
  return (
    <div className="screen">
      <h1>Welcome to 3DEXPERIENCE Quest</h1>
      <p>
        Discover a world where Dassault Systèmes’ innovative ecosystem merges design, simulation, manufacturing,
        collaboration, and data insights into one transformative digital experience.
        Embark on a quest to uncover your unique digital destiny and learn something new about yourself.
      </p>
      <button onClick={onStart}>Start Your Journey</button>
    </div>
  );
};

export default WelcomeScreen;
