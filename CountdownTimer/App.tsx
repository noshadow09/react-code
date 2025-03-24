import React, { useState } from 'react';
import CountdownTimer from './CountdownTimer';
import './App.css';

const App: React.FC = () => {
  const [minutes, setMinutes] = useState<number>(5);
  const [seconds, setSeconds] = useState<number>(0);
  const [timerValue, setTimerValue] = useState<number>(300); // Default 5 minutes

  const handleTimerComplete = () => {
    console.log('Timer completed!');
  };

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setMinutes(value);
  };

  const handleSecondsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    // Keep seconds between 0-59
    setSeconds(Math.min(59, Math.max(0, value)));
  };

  const handleSetTimer = () => {
    // Convert minutes and seconds to total seconds
    const totalSeconds = (minutes * 60) + seconds;
    setTimerValue(totalSeconds);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Countdown Timer</h1>
        <div className="timer-input">
          <div className="input-group">
            <label htmlFor="minutes">Minutes:</label>
            <input
              id="minutes"
              type="number"
              min="0"
              value={minutes}
              onChange={handleMinutesChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="seconds">Seconds:</label>
            <input
              id="seconds"
              type="number"
              min="0"
              max="59"
              value={seconds}
              onChange={handleSecondsChange}
            />
          </div>
          <button onClick={handleSetTimer}>Set Timer</button>
        </div>
        <CountdownTimer
          initialTime={timerValue}
          onComplete={handleTimerComplete}
        />
      </header>
    </div>
  );
};

export default App; 