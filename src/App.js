import React, { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import MotivationScreen from './components/MotivationScreen';
import WorkPreferenceScreen from './components/WorkPreferenceScreen';
import ChallengeScreen from './components/ChallengeScreen';
import ResultScreen from './components/ResultScreen';
import ProgressBar from './components/ProgressBar';

const App = () => {
  const [progress, setProgress] = useState(0);
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [selections, setSelections] = useState({});

  const updateProgress = (percent) => setProgress(percent);

  const handleStart = () => {
    updateProgress(20);
    setCurrentScreen('motivation');
  };

  const handleSelectMotivation = (motivation) => {
    setSelections(prev => ({ ...prev, motivation }));
    updateProgress(40);
    setCurrentScreen('workPreference');
  };

  const handleSelectWorkPreference = (workPreference) => {
    setSelections(prev => ({ ...prev, workPreference }));
    updateProgress(60);
    setCurrentScreen('challenge');
  };

  const handleSelectChallenge = (challenge) => {
    setSelections(prev => ({ ...prev, challenge }));
    updateProgress(100);
    setCurrentScreen('result');
  };

  const handleRestart = () => {
    setSelections({});
    updateProgress(0);
    setCurrentScreen('welcome');
  };

  return (
    <div>
      <ProgressBar progress={progress} />
      {currentScreen === 'welcome' && <WelcomeScreen onStart={handleStart} />}
      {currentScreen === 'motivation' && <MotivationScreen onSelectMotivation={handleSelectMotivation} />}
      {currentScreen === 'workPreference' && <WorkPreferenceScreen onSelectWorkPreference={handleSelectWorkPreference} />}
      {currentScreen === 'challenge' && <ChallengeScreen onSelectChallenge={handleSelectChallenge} />}
      {currentScreen === 'result' && <ResultScreen selections={selections} onRestart={handleRestart} />}
    </div>
  );
};

export default App;
