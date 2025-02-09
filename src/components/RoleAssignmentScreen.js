// src/components/RoleAssignmentScreen.js
import React, { useState } from 'react';
import './RoleAssignmentScreen.css';
import { calculateMatchScore } from '../utils/roleScoring';

const RoleAssignmentScreen = ({ selections, onConfirm, onBack, rolesData }) => {
  const [selectedRoles, setSelectedRoles] = useState([]);

    // Define weights for each criterion: initial answers are more important.
    const weights = {
        motivation: 3,
        industry: 3,
        specialization: 1,
        workPreference: 2,
        //challenge: 2 //Removed
    };

  // Calculate scores for *all* roles, *then* filter and sort
  let candidateRoles = rolesData.map(role => calculateMatchScore(role, selections, weights));

  // Filter roles with any positive match, and limit to top 6.
  candidateRoles = candidateRoles.filter(role => role.weightedScore > 0);
  candidateRoles.sort((a, b) => b.percent - a.percent || b.weightedScore - a.weightedScore);
  candidateRoles = candidateRoles.slice(0, 6);

    const noMatchMessage = candidateRoles.length === 0 ? (
    <p>No roles perfectly match your selections.  Consider broadening your criteria or exploring all roles.</p>
        ) : null;

  const toggleRoleSelection = (role) => {
    if (selectedRoles.includes(role)) {
      setSelectedRoles(selectedRoles.filter(r => r !== role));
    } else {
      setSelectedRoles([...selectedRoles, role]);
    }
  };

  const getBarClass = (percent) => {
    if (percent >= 75) return 'high';
    if (percent >= 50) return 'medium';
    return 'low'; // Covers both > 0 and 0 cases
  };

  const getBorderColor = (percent) => {
    if (percent >= 75) return '#4caf50'; // green
    if (percent >= 50) return '#FFC107'; // amber
    return '#f44336';   // red (for both > 0 and 0 cases)
  };

  return (
    <div className="screen">
      <h2>Select Your Recommended Roles</h2>
      <p>Based on your responses, we have refined the options to the top 6 roles.</p>
      {noMatchMessage}
      <div className="role-grid">
        {candidateRoles.map((role, index) => {
          const percent = role.totalWeight > 0 ? Math.round((role.weightedScore / role.totalWeight) * 100) : 0;
          const barClass = getBarClass(percent);
          const borderColor = getBorderColor(percent);
          return (
            <div
              key={index}
              className={`option ${selectedRoles.includes(role) ? 'selected' : ''}`}
              onClick={() => toggleRoleSelection(role)}
              style={{
                borderColor: selectedRoles.includes(role) ? '#ffffff' : borderColor,
                boxShadow: selectedRoles.includes(role) ? '0 0 12px #ffffff' : 'none'
              }}
            >
              <h3>
                {role.Role} <span style={{ fontSize: '0.8em', color: '#ccc' }}>
                  ({role.guild} – {role.subcategory})
                </span>
              </h3>
              <p>{role.Description}</p>
              <p>Match: {role.weightedScore}/{role.totalWeight} ({percent}%)</p>
              <div className="match-gauge">
                <div className={`match-bar ${barClass}`} style={{ width: `${percent}%` }}></div>
              </div>
            </div>
          );
        })}
      </div>
      <button onClick={() => onConfirm(selectedRoles)}>Confirm My Roles</button>
      <button className="back-button" onClick={onBack}>Back</button>
    </div>
  );
};

export default RoleAssignmentScreen;