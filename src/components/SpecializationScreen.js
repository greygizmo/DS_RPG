import React from 'react';

const SpecializationScreen = ({ onSelectSpecialization, onBack }) => {
  const levels = [
    { value: 1, label: "Beginner" },
    { value: 2, label: "Intermediate" },
    { value: 3, label: "Expert" }
  ];

  return (
    <div className="screen">
      <h2>Your Level of Specialization</h2>
      <p>Select your level of specialization.</p>
      {levels.map((level) => (
        <div key={level.value} className="option" onClick={() => onSelectSpecialization(level.value)}>
          <h3>{level.label}</h3>
        </div>
      ))}
      <button className="back-button" onClick={onBack}>Back</button>
    </div>
  );
};

export default SpecializationScreen;
