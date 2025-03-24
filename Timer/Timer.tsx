import React, { useState, useEffect, useRef } from 'react';

// Define a type for our timer states
type TimerState = 'stopped' | 'running' | 'paused';

const Timer: React.FC = () => {
  const [timerState, setTimerState] = useState<TimerState>('stopped');
  const [displayTime, setDisplayTime] = useState<string>('00:00.00');

  // Using refs to avoid dependencies in useEffect
  const startTimeRef = useRef<number>(0);
  const timeAccumulatedRef = useRef<number>(0);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (timerState === 'running') {
      // When we start running, we set the current time as the start time
      startTimeRef.current = Date.now();

      intervalId = setInterval(() => {
        const currentTime = Date.now();
        const elapsedTime = currentTime - startTimeRef.current + timeAccumulatedRef.current;
        updateDisplayTime(elapsedTime);
      }, 10); // Update every 10ms for smoother display
    } else {
      // For any non-running state, clear the interval
      if (intervalId) {
        clearInterval(intervalId);
      }

      // Only update accumulated time when pausing
      if (timerState === 'paused' && startTimeRef.current > 0) {
        timeAccumulatedRef.current += Date.now() - startTimeRef.current;
        // Reset startTimeRef so we don't double-count time
        startTimeRef.current = 0;
      }
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [timerState]);

  const updateDisplayTime = (timeInMs: number) => {
    const minutes = Math.floor(timeInMs / 60000);
    const seconds = Math.floor((timeInMs % 60000) / 1000);
    const milliseconds = Math.floor((timeInMs % 1000) / 10);

    setDisplayTime(
      `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`
    );
  };

  const handleStart = () => {
    setTimerState('running');
  };

  const handlePause = () => {
    setTimerState('paused');
  };

  const handleStop = () => {
    setTimerState('stopped');
    timeAccumulatedRef.current = 0;
    startTimeRef.current = 0;
    setDisplayTime('00:00.00');
  };

  return (
    <div className="timer-container">
      <div className="timer-display">{displayTime}</div>
      <div className="timer-controls">
        {timerState === 'stopped' && (
          <button onClick={handleStart}>Start</button>
        )}
        {timerState === 'running' && (
          <button onClick={handlePause}>Pause</button>
        )}
        {timerState === 'paused' && (
          <button onClick={handleStart}>Resume</button>
        )}
        {(timerState === 'running' || timerState === 'paused') && (
          <button onClick={handleStop}>Stop</button>
        )}
      </div>
    </div>
  );
};

export default Timer; 