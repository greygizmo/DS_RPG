// src/App.js
import React, { useState, useEffect } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import MotivationScreen from './components/MotivationScreen';
import WorkPreferenceScreen from './components/WorkPreferenceScreen';
import IndustryScreen from './components/IndustryScreen';
import SpecializationScreen from './components/SpecializationScreen';
// REMOVE: import ChallengeScreen from './components/ChallengeScreen';  // No longer needed
import RoleAssignmentScreen from './components/RoleAssignmentScreen';
import FinalResultScreen from './components/FinalResultScreen';
import ProgressBar from './components/ProgressBar';
import { fetchRolesData, calculateMatchScore } from './utils/roleScoring';
import RoleSelectionScreen from './components/RoleSelectionScreen';

const App = () => {
  const [progress, setProgress] = useState(0);
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [selections, setSelections] = useState({});
  const [assignedRoles, setAssignedRoles] = useState([]);
  const [history, setHistory] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [sortedRoles, setSortedRoles] = useState([]);

  // Steps without ChallengeScreen
  const steps = ['welcome', 'motivation', 'workPreference', 'industry', 'specialization', 'roleAssignment', 'finalResult'];

  useEffect(() => {
    async function loadRoles() {
      try {
        const data = await fetchRolesData();
        setRoles(data);

        // Data validation checks
        console.log("Total roles loaded:", data.length);

        // Check for unique values in 'guild' and 'subcategory'
        const guilds = new Set();
        const subcategories = new Set();
        const industries = new Set();
        data.forEach(role => {
          guilds.add(role.guild);
          subcategories.add(role.subcategory);
          industries.add(role.industry);
        });
        console.log("Unique Guilds:", Array.from(guilds).sort());
        console.log("Unique Subcategories:", Array.from(subcategories).sort());
        console.log("Unique Industries:", Array.from(industries).sort());

        // Check for roles with missing data
        const rolesWithMissingData = data.filter(role => 
          !role.guild || !role.subcategory || !role.industry || !role.levelOfSpecialization
        );
        if (rolesWithMissingData.length > 0) {
          console.warn("Roles with missing data:", rolesWithMissingData);
        }

      } catch (error) {
        console.error("Failed to load roles:", error);
      }
    }
    loadRoles();
  }, []);

  useEffect(() => {
    if (roles.length > 0 && Object.keys(selections).length > 0) {
      // Calculate scores and sort roles
      const scoredRoles = roles.map(role => {
        const score = calculateMatchScore(role, selections, {
          motivation: 2,
          industry: 2,
          specialization: 1,
          workPreference: 1
        });
        return score;
      });

      // Sort by percent match and take top 6
      const topRoles = scoredRoles
        .sort((a, b) => b.percent - a.percent)
        .slice(0, 6);

      setSortedRoles(topRoles);
    }
  }, [roles, selections]);

  const updateProgress = () => {
    const currentStepIndex = steps.indexOf(currentScreen);
    const newProgress = ((currentStepIndex + 1) / steps.length) * 100;
    setProgress(newProgress);
  };

  const navigateTo = (screen) => {
    if (currentScreen !== 'welcome') {
      setHistory(prev => [...prev, currentScreen]);
    }
    setCurrentScreen(screen);
  };

  useEffect(() => {
    updateProgress();
  }, [currentScreen]);

  const handleBack = () => {
    if (history.length > 0) {
      const previousScreen = history[history.length - 1];
      setHistory(prev => prev.slice(0, prev.length - 1));
      setCurrentScreen(previousScreen);
    }
  };

  const handleStart = () => navigateTo('motivation');
  const handleSelectMotivation = (motivation) => {
    setSelections(prev => ({ ...prev, motivation }));
    navigateTo('workPreference');
  };
  const handleSelectWorkPreference = (workPreference) => {
    setSelections(prev => ({ ...prev, workPreference }));
    navigateTo('industry');
  };
  const handleSelectIndustry = (industry) => {
    setSelections(prev => ({ ...prev, industry }));
    navigateTo('specialization');
  };
  const handleSelectSpecialization = (specialization) => {
    setSelections(prev => ({ ...prev, specialization }));
    navigateTo('roleAssignment'); // Go directly to role assignment
  };

  // REMOVE: No handleSelectChallenge

  const handleConfirmRoles = (roles) => {
    setAssignedRoles(roles);
    setCurrentScreen('finalResult');
  };

  const handleRestart = () => {
    setSelections({});
    setAssignedRoles([]);
    setHistory([]);
    setCurrentScreen('welcome');
  };

  const handleSelectRole = (role) => {
    setSelectedRoles(prev => {
      // If role is already selected, remove it
      if (prev.find(r => r.id === role.id)) {
        return prev.filter(r => r.id !== role.id);
      }
      // Otherwise add it (up to 3 roles)
      if (prev.length < 3) {
        return [...prev, role];
      }
      return prev;
    });
  };

  return (
    <div>
      <ProgressBar progress={progress} />
      {roles.length > 0 ? (
        <>
          {currentScreen === 'welcome' && <WelcomeScreen onStart={handleStart} />}
          {currentScreen === 'motivation' && (
            <MotivationScreen onSelectMotivation={handleSelectMotivation} onBack={handleBack} />
          )}
          {currentScreen === 'workPreference' && (
            <WorkPreferenceScreen onSelectWorkPreference={handleSelectWorkPreference} onBack={handleBack} />
          )}
          {currentScreen === 'industry' && (
            <IndustryScreen onSelectIndustry={handleSelectIndustry} onBack={handleBack} />
          )}
          {currentScreen === 'specialization' && (
            <SpecializationScreen onSelectSpecialization={handleSelectSpecialization} onBack={handleBack} />
          )}
          {/* REMOVE: ChallengeScreen */}
          {currentScreen === 'roleAssignment' && (
            <RoleSelectionScreen 
              roles={sortedRoles}
              onSelectRole={handleSelectRole}
              selectedRoles={selectedRoles}
              onBack={handleBack}
              onConfirm={() => {
                handleConfirmRoles(selectedRoles);
                navigateTo('finalResult');
              }}
            />
          )}
          {currentScreen === 'finalResult' && (
            <FinalResultScreen 
              selections={selections} 
              assignedRoles={selectedRoles} 
              onRestart={handleRestart} 
              onBack={handleBack} 
            />
          )}
        </>
      ) : (
        <p>Loading roles...</p>
      )}
    </div>
  );
};

export default App;