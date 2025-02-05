import React from 'react';

const WorkPreferenceScreen = ({ onSelectWorkPreference }) => {
  return (
    <div className="screen">
      <h2>Your Work Style</h2>
      <p>
        How do you prefer to approach challenges?
      </p>
      <div className="option" onClick={() => onSelectWorkPreference('Solo Explorer')}>
        <h3>Solo Explorer</h3>
        <p>I enjoy delving deep into ideas on my own.</p>
      </div>
      <div className="option" onClick={() => onSelectWorkPreference('Team Player')}>
        <h3>Team Player</h3>
        <p>I thrive when collaborating and sharing insights with others.</p>
      </div>
    </div>
  );
};

export default WorkPreferenceScreen;
