import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
    initialTime: number; // Initial time in seconds
    onComplete?: () => void; // Optional callback when timer completes
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
    initialTime,
    onComplete
}) => {
    const [timeRemaining, setTimeRemaining] = useState<number>(initialTime);
    const [isRunning, setIsRunning] = useState<boolean>(false);

    useEffect(() => {
        // Reset time remaining when initialTime prop changes
        setTimeRemaining(initialTime);
    }, [initialTime]);

    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        if (isRunning && timeRemaining > 0) {
            intervalId = setInterval(() => {
                setTimeRemaining(prevTime => {
                    if (prevTime <= 1) {
                        clearInterval(intervalId);
                        setIsRunning(false);
                        onComplete && onComplete();
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }

        // Clean up the interval when the component unmounts or when isRunning changes
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [isRunning, onComplete, timeRemaining]);

    // Format time as mm:ss
    const formatTime = (time: number): string => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    // Controls for the timer
    const handleStart = () => {
        setIsRunning(true);
    };

    const handlePause = () => {
        setIsRunning(false);
    };

    const handleReset = () => {
        setTimeRemaining(initialTime);
        setIsRunning(false);
    };

    return (
        <div className="countdown-timer">
            <div className="timer-display">{formatTime(timeRemaining)}</div>
            <div className="timer-controls">
                {!isRunning ? (
                    <button onClick={handleStart}>{timeRemaining === initialTime ? "Start" : "Resume"}</button>
                ) : (
                    <button onClick={handlePause}>Pause</button>
                )}
                <button onClick={handleReset}>Reset</button>
            </div>
            {!isRunning && timeRemaining === 0 && (
                <div className="timer-complete">Time's up!</div>
            )}
        </div>
    );
};

export default CountdownTimer; 