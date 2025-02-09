// src/components/FinalResultScreen.js
import React from 'react';
import './ResultScreen.css';

const FinalResultScreen = ({ selections, assignedRoles, onRestart, onBack }) => {
  const { motivation, workPreference, industry, specialization } = selections; //Removed challenge

  const narrative = `
    Your journey reveals that you are driven by <strong>${motivation}</strong> and prefer to work as a <strong>${workPreference}</strong>.
    Working in the <strong>${industry}</strong> industry at a <strong>${specialization === 1 ? "Beginner" : specialization === 2 ? "Intermediate" : "Expert"}</strong> level,
    your digital destiny is enriched by the following roles:
  `; // Removed challenge from the narrative.

    // Handle case where no roles were selected
    const noRolesSelected = assignedRoles.length === 0;

  return (
    <div className="screen result-screen">
      <h2>Your Innovation Passport</h2>
        <div className="role-spotlight">
            <h3 className="role-title">Assigned Roles</h3>
            {noRolesSelected ? (
            <p>You did not select any roles. Please go back and choose at least one, or restart the quest.</p>
            ) : (
            assignedRoles.map((role, index) => (
                <div key={index} style={{ marginBottom: '15px' }}>
                <h4 className="role-title">{role.Role} <span style={{fontSize:'0.8em', color:'#004B87'}}>({role.guild} – {role.subcategory})</span></h4>
                <p className="role-description">{role.Description}</p>
                </div>
            ))
            )}
        </div>

      <div className="narrative" dangerouslySetInnerHTML={{ __html: narrative }} />
      <div className="recap">
        <h4>Journey Recap</h4>
        <ul>
          <li><strong>Motivation:</strong> {motivation}</li>
          <li><strong>Work Preference:</strong> {workPreference}</li>
          <li><strong>Industry:</strong> {industry}</li>
          <li><strong>Specialization:</strong> {specialization === 1 ? "Beginner" : specialization === 2 ? "Intermediate" : "Expert"}</li>
        </ul>
      </div>
      <p>
        Dassault Systèmes’ 3DEXPERIENCE ecosystem unites design, simulation, manufacturing, collaboration, and data insights into one transformative digital experience.
      </p>
      <button onClick={onRestart}>Restart Your Quest</button>
      <button className="back-button" onClick={onBack}>Back</button>
    </div>
  );
};

export default FinalResultScreen;