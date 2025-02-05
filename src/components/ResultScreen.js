import React from 'react';
import './ResultScreen.css';

const ResultScreen = ({ selections, onRestart }) => {
  const { motivation, workPreference, challenge } = selections;

  let recommendedRole = '';
  let roleDescription = '';

  if (motivation === 'Creative Expression') {
    recommendedRole = workPreference === 'Solo Explorer' ? '3D Creator' : 'Collaborative Conductor';
    roleDescription = recommendedRole === '3D Creator'
      ? "As a 3D Creator, you'll transform raw ideas into breathtaking digital masterpieces using state-of-the-art CAD tools like CATIA and SOLIDWORKS. Your creative vision will drive innovation in every project you undertake."
      : "As a Collaborative Conductor, you lead teams in crafting collective masterpieces. Your role harnesses the power of collaboration to fuse creative minds into groundbreaking digital solutions.";
  } else if (motivation === 'Analytical Rigor') {
    recommendedRole = 'Simulation Specialist';
    roleDescription = "As a Simulation Specialist, you'll use advanced tools like SIMULIA to turn scientific theories into dynamic, virtual experiments. Your analytical prowess will guide you in testing and optimizing innovative designs.";
  } else if (motivation === 'Efficiency & Order') {
    recommendedRole = 'Manufacturing Maestro';
    roleDescription = "In the role of Manufacturing Maestro, you'll streamline complex production processes with DELMIA's digital manufacturing solutions. Precision and efficiency are your trademarks as you turn prototypes into reality.";
  } else if (motivation === 'Collaboration & Teamwork') {
    recommendedRole = 'Collaboration Catalyst';
    roleDescription = "As a Collaboration Catalyst, you bring diverse talents together using ENOVIA's robust collaborative tools. Your ability to unite ideas will drive transformative digital innovation.";
  } else {
    recommendedRole = 'Digital Innovator';
    roleDescription = "Embrace the role of Digital Innovator and explore the full spectrum of the 3DEXPERIENCE ecosystem. Merge design, simulation, manufacturing, and collaboration to create groundbreaking digital experiences.";
  }

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
          <li><strong>Recommended Role:</strong> {recommendedRole}</li>
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
