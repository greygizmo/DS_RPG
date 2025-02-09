import React from 'react';

const IndustryScreen = ({ onSelectIndustry, onBack }) => {
  const industries = [
    "Generic",
    "Education",
    "Aerospace",
    "Marine & Offshore",
    "High-Tech",
    "Life Sciences",
    "Mining",
    "Transportation & Mobility",
    "Construction",
    "ConsumerGoods"
  ];

  return (
    <div className="screen">
      <h2>Your Industry</h2>
      <p>Select the industry that best describes your work.</p>
      {industries.map((ind, index) => (
        <div key={index} className="option" onClick={() => onSelectIndustry(ind)}>
          <h3>{ind}</h3>
        </div>
      ))}
      <button className="back-button" onClick={onBack}>Back</button>
    </div>
  );
};

export default IndustryScreen;
