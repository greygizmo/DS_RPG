// src/components/RpgRoleFinder.js
import React, { useState, useEffect } from 'react';
import {
  fetchRolesData,
  calculateMatchScore,
  getMatchDescription,
} from '../utils/roleScoring';
import './RpgRoleFinder.css'; // or your main theme file

const RpgRoleFinder = () => {
  const [roles, setRoles] = useState([]);
  const [criteria, setCriteria] = useState({ domain: '', level: '' });
  const [results, setResults] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchRolesData();
        setRoles(data);
      } catch (err) {
        console.error(err);
      }
    }
    loadData();
  }, []);

  function handleSearch() {
    // compute score for each role
    let scored = roles.map((role) => {
      const { score, total } = calculateMatchScore(role, criteria);
      return { role, score, total, percent: total ? Math.round((score / total) * 100) : 0 };
    });

    // filter or show all but sort by score desc
    scored = scored.filter((r) => r.score > 0);
    scored.sort((a, b) => b.score - a.score);

    setResults(scored);
  }

  return (
    <div className="rpg-container">
      <h2>DS Role Quest 2.0</h2>

      <div className="criteria-form">
        <label>
          Domain:
          <select
            value={criteria.domain}
            onChange={(e) => setCriteria({ ...criteria, domain: e.target.value })}
          >
            <option value="">Any</option>
            <option value="Engineering">Engineering</option>
            <option value="Magic">Magic</option>
            {/* etc. */}
          </select>
        </label>

        <label>
          Experience Level:
          <select
            value={criteria.level}
            onChange={(e) => setCriteria({ ...criteria, level: e.target.value })}
          >
            <option value="">Any</option>
            <option value="Junior">Apprentice (Junior)</option>
            <option value="Senior">Master (Senior)</option>
          </select>
        </label>

        <button onClick={handleSearch}>Find My Role</button>
      </div>

      <div className="results-list">
        {results.length === 0 && <p>No matching roles yet. Select criteria and click search.</p>}
        {results.map(({ role, score, total, percent }, idx) => {
          const desc = getMatchDescription(score, total);
          let matchClass = 'low';
          if (percent === 100 || percent >= 75) matchClass = 'high';
          else if (percent >= 50) matchClass = 'medium';

          return (
            <div key={idx} className="role-card">
              <h3>{role.name} – {score}/{total} ({percent}%)</h3>
              <div className="match-gauge">
                <div className={`match-bar ${matchClass}`} style={{ width: `${percent}%` }} />
              </div>
              <p className="match-text">{desc}</p>
              {/* Add any role.description or other fields here */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RpgRoleFinder;
