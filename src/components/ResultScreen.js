import React from 'react';
import rolesData from '../data/rolesData';
import './ResultScreen.css';

const ResultScreen = ({ selections, onRestart }) => {
  const { motivation, workPreference, challenge } = selections;

  // Map motivation to a set of categories
  const motivationMapping = {
    'Creative Expression': ['Design', 'Immersive'],
    'Analytical Rigor': ['Simulation', 'Analytics'],
    'Efficiency & Order': ['Manufacturing', 'Management'],
    'Collaboration & Teamwork': ['Collaboration', 'Planning', 'Innovation', 'Industry Planning']
  };

  let candidateRoles = rolesData;
  if (motivationMapping[motivation]) {
    candidateRoles = rolesData.filter(role => motivationMapping[motivation].includes(role.category));
  }
  if (candidateRoles.length === 0) candidateRoles = rolesData;

  // Randomly select one role from the candidate roles
  const randomIndex = Math.floor(Math.random() * candidateRoles.length);
  const selectedRole = candidateRoles[randomIndex];
  const recommendedRole = selectedRole.name;
  const roleDescription = selectedRole.description;

  const narrative = `
    Your journey reveals that you are driven by <strong>${motivation}</strong> and prefer to work as a <strong>${workPreference}</strong>.
    Embracing the "<strong>${challenge}</strong>" challenge, your digital destiny is best embodied by the role of 
    <span class="role-name">${recommendedRole}</span> within the 3DEXPERIENCE ecosystem.
    This role empowers you to harness cutting-edge tools to transform ideas into reality—merging design, simulation, manufacturing, collaboration, and data insights into one transformative platform.
  `;

  return (
    <div className="screen result-screen">
      <h2>Your Innovation Passport</h2>
      <div className="role-spotlight">
        <h3 className="role-title">{recommendedRole}</h3>
        <p className="role-description">{roleDescription}</p>
      </div>
      <div className="narrative" dangerouslySetInnerHTML={{ __html: narrative }} />
      <div className="recap">
        <h4>Journey Recap</h4>
        <ul>
          <li><strong>Motivation:</strong> {motivation}</li>
          <li><strong>Work Preference:</strong> {workPreference}</li>
          <li><strong>Challenge:</strong> {challenge}</li>
          <li><strong>Recommended Role:</strong> {recommendedRole} ({selectedRole.category})</li>
        </ul>
      </div>
      <p>
        Dassault Systèmes’ 3DEXPERIENCE ecosystem unites design, simulation, manufacturing, collaboration, and data insights into one transformative digital experience.
        Continue exploring, learning, and innovating!
      </p>
      <button onClick={onRestart}>Restart Your Quest</button>
    </div>
  );
};

export default ResultScreen;
