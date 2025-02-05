// RoleSelectionScreen.js
import React from 'react';
import rolesData from '../data/rolesData';

const RoleSelectionScreen = ({ onSelectRole }) => {
  return (
    <div className="screen">
      <h2>Choose Your Domain of Mastery</h2>
      <p>
        The 3DEXPERIENCE ecosystem spans design, simulation, manufacturing, collaboration, and much more.
        Select the digital domain that resonates with you.
      </p>
      {rolesData.map(role => (
        <div
          key={role.id}
          className="option"
          onClick={() => onSelectRole(role)}
        >
          <h3>{role.name}</h3>
          <p>{role.description}</p>
        </div>
      ))}
    </div>
  );
};

export default RoleSelectionScreen;
