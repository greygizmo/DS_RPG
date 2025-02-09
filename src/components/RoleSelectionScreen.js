// RoleSelectionScreen.js
import React from 'react';
import './RoleSelectionScreen.css';
import '../fonts.css';

const RoleSelectionScreen = ({ roles, onSelectRole, selectedRoles, onBack, onConfirm }) => {
  return (
    <div className="screen">
      <h2>Select Your Recommended Roles</h2>
      <p>Based on your responses, we have refined the options to the top 6 roles.</p>
      <p className="selection-hint">Select up to 3 roles that interest you most.</p>
      
      {roles.map(role => {
        const isSelected = selectedRoles?.find(r => r.id === role.id);
        return (
          <div
            key={role.id}
            className={`role-option ${isSelected ? 'selected' : ''}`}
            onClick={() => onSelectRole(role)}
          >
            <h3>{role.role}</h3>
            <h4>({role.guild} – {role.subcategory})</h4>
            <div className="match-info">
              <p>Match: {Math.round(role.percent)}%</p>
              <div className="progress-bar">
                <div 
                  className="progress" 
                  style={{ width: `${role.percent}%` }}
                ></div>
              </div>
            </div>
            <p>{role.description}</p>
          </div>
        );
      })}

      <div className="navigation-buttons">
        <button className="back-button" onClick={onBack}>Back</button>
        <button 
          className="confirm-button" 
          onClick={onConfirm}
          disabled={!selectedRoles || selectedRoles.length === 0}
        >
          Confirm Selection
        </button>
      </div>
    </div>
  );
};

export default RoleSelectionScreen;
