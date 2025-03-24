# COUNTER

#### App.tsx

```typescript
import { useState } from 'react';

const App: React.FC = () => {

  const [count, setCount] = useState<number>(0);

  return (
    <div>
      <button onClick={() => setCount((prevCount: number) => prevCount - 1)}
      >-</button>
      <button onClick={() => setCount((prevCount: number) => prevCount + 1)}
      >+</button>
      <p>clicked: {count}</p>
    </div>
  );
};

export default App;
```



# COUNTER (with Redux)

https://github.com/manavukani/basic-redux/tree/main/src

**<u>Imp files</u>** (in order to send)

- app.tsx,
- index.tsx (or main),
- state/store.ts,
- state/counter/counterSlice.ts,
- components/MyComponent.tsx



# TODO (with localStorage)

#### App.tsx

```typescript
// App.tsx
import { useState, useEffect } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [inputValue, setInputValue] = useState('');

  // Save to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false
      }]);
      setInputValue('');
    }
  };

  const handleToggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>Todo List</h1>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
          style={{ flexGrow: 1, padding: '8px' }}
        />
        <button
          onClick={handleAddTodo}
          style={{ padding: '8px 16px', backgroundColor: '#4CAF50', color: 'white', border: 'none' }}
        >
          Add
        </button>
      </div>
      
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map(todo => (
          <li
            key={todo.id}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '8px 0' }}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleTodo(todo.id)}
            />
            <span style={{ 
              flexGrow: 1,
              textDecoration: todo.completed ? 'line-through' : 'none'
            }}>
              {todo.text}
            </span>
            <button
              onClick={() => handleDeleteTodo(todo.id)}
              style={{ 
                padding: '4px 8px',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none'
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```



# TYPEWRITER

#### App.tsx

```typescript
import { useState } from 'react';
import Typewriter from './Typewriter';

function App() {
  const [inputText, setInputText] = useState('');

  return (
    <div style={{ padding: '2rem' }}>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter text for animation..."
        style={{ marginBottom: '1rem', padding: '0.5rem' }}
      />
      <Typewriter text={inputText} />
    </div>
  );
}

export default App;
```

#### Typewrite.tsx (simple clear, no deleting effect)

```typescript
import { useState, useEffect } from 'react';

const Typewriter = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Animation timing constants
  const typingSpeed = 150;
  const resetDelay = 1000; // Time before reset

  useEffect(() => {
    if (!text) return;

    const timeout = setTimeout(() => {
      // Typing phase
      if (currentIndex < text.length) {
        setDisplayText(text.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      } else {
        // Reset text to empty after typing is complete
        setTimeout(() => {
          setDisplayText('');
          setCurrentIndex(0); // Reset index for the next text
        }, resetDelay);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentIndex, text]);

  // Reset animation when text changes
  useEffect(() => {
    setCurrentIndex(0);
    setDisplayText('');
  }, [text]);

  return <div style={{ fontSize: '1.5rem', fontFamily: 'monospace' }}>{displayText}</div>;
};

export default Typewriter;

```



#### Typewriter.tsx (with deleting effect)

```typescript
import { useState, useEffect } from 'react';

const Typewriter = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Animation timing constants
  const typingSpeed = 150;
  const deletingSpeed = 50;
  const pauseDuration = 1000;

  useEffect(() => {
    if (!text) return;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing phase
        if (currentIndex < text.length) {
          setDisplayText(text.substring(0, currentIndex + 1));
          setCurrentIndex(currentIndex + 1);
        } else {
          // Switch to deleting after pause
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      } else {
        // Deleting phase
        if (currentIndex > 0) {
          setDisplayText(text.substring(0, currentIndex - 1));
          setCurrentIndex(currentIndex - 1);
        } else {
          // Reset to typing after pause
          setTimeout(() => setIsDeleting(false), pauseDuration);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentIndex, isDeleting, text]);

  // Reset animation when text changes
  useEffect(() => {
    setCurrentIndex(0);
    setIsDeleting(false);
  }, [text]);

  return <div style={{ fontSize: '1.5rem', fontFamily: 'monospace' }}>{displayText}</div>;
};

export default Typewriter;
```



# TYPEWRITER (with button to start)

#### App.tsx

```typescript
import { useState } from 'react';
import Typewriter from './Typewriter';

function App() {
  const [inputText, setInputText] = useState('');
  const [startAnimation, setStartAnimation] = useState(false);

  const handleStart = () => {
    setStartAnimation(true);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter text for animation..."
        style={{ marginBottom: '1rem', padding: '0.5rem' }}
      />
      <button 
        onClick={handleStart}
        style={{ marginBottom: '1rem', padding: '0.5rem', marginLeft: '0.5rem' }}
      >
        Start Animation
      </button>
      <Typewriter text={inputText} start={startAnimation} onComplete={() => setStartAnimation(false)} />
    </div>
  );
}

export default App;
```



#### Typewriter.tsx

```typescript
import { useState, useEffect } from 'react';

const Typewriter = ({ 
  text, 
  start, 
  onComplete 
}: { 
  text: string;
  start: boolean;
  onComplete: () => void;
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const typingSpeed = 150;
  const resetDelay = 1000;

  useEffect(() => {
    if (!text || !start) return;

    const timeout = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText(text.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      } else {
        setTimeout(() => {
          setDisplayText('');
          setCurrentIndex(0);
          onComplete();
        }, resetDelay);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentIndex, text, start, onComplete]);

  useEffect(() => {
    setCurrentIndex(0);
    setDisplayText('');
  }, [text]);

  return <div style={{ fontSize: '1.5rem', fontFamily: 'monospace' }}>{displayText}</div>;
};

export default Typewriter;

```



# TIMER (start/pause & stop)

#### App.tsx

```typescript
import React from 'react';
import Timer from './Timer';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <h1>React TypeScript Timer</h1>
      <Timer />
    </div>
  );
};

export default App;
```

#### Timer.tsx

```typescript
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
```



# THEME -- useContext

#### ThemeContext.tsx

```typescript
// ThemeContext.tsx
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Initialize theme from localStorage or default to 'light'
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme');
    return (savedTheme as Theme) || 'light';
  });

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  // Apply theme to document when theme changes
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for using the theme context
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
```

#### App.tsx

```typescript

// App.tsx
import React from 'react';
import { ThemeProvider, useTheme } from './ThemeContext';
import './styles.css';

const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
    </button>
  );
};

const Content: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <div className="content">
      <h1>Theme Toggler</h1>
      <p>Current theme: {theme}</p>
      <ThemeToggleButton />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="app">
        <Content />
      </div>
    </ThemeProvider>
  );
};

export default App;
```

#### styles.css

```css
/* styles.css */
:root {
    --bg-light: #ffffff;
    --text-light: #333333;
    --bg-dark: #333333;
    --text-dark: #ffffff;
}

body {
    margin: 0;
    transition: background-color 0.3s ease, color 0.3s ease;
}

body[data-theme='light'] {
    background-color: var(--bg-light);
    color: var(--text-light);
}

body[data-theme='dark'] {
    background-color: var(--bg-dark);
    color: var(--text-dark);
}

.app {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 20px;
}

.content {
    text-align: center;
}
```



# Accordion

#### Accordion.tsx

```typescript
import React, { useState } from 'react';

// Define types for our accordion data
interface AccordionItem {
  id: string;
  title: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItem[];
  defaultExpanded?: string | null;
}

const Accordion: React.FC<AccordionProps> = ({ items, defaultExpanded = null }) => {
  // State to track which item is expanded
  const [expandedId, setExpandedId] = useState<string | null>(defaultExpanded);

  // Toggle function for expanding/collapsing items
  const toggleItem = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="accordion">
      {items.map((item) => {
        const isExpanded = expandedId === item.id;
        
        return (
          <div key={item.id} className="accordion-item">
            <div 
              className="accordion-header"
              onClick={() => toggleItem(item.id)}
              style={{
                padding: '12px 16px',
                backgroundColor: '#f1f1f1',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid #ddd'
              }}
            >
              <h3 style={{ margin: 0 }}>{item.title}</h3>
              <span>{isExpanded ? '▲' : '▼'}</span>
            </div>
            
            {isExpanded && (
              <div 
                className="accordion-content"
                style={{
                  padding: '16px',
                  borderBottom: '1px solid #ddd'
                }}
              >
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
```

#### App.tsx

```typescript
import React from 'react';
import Accordion from './Accordian';

// Sample data for the accordion
const accordionData = [
  {
    id: '1',
    title: 'What is React?',
    content: 'React is a JavaScript library for building user interfaces. It allows developers to create large web applications that can change data, without reloading the page.'
  },
  {
    id: '2',
    title: 'How does the Accordion work?',
    content: 'The Accordion component uses React\'s useState hook to track which section is expanded. When a user clicks on a section header, it toggles the visibility of the content.'
  },
  {
    id: '3',
    title: 'Why use TypeScript with React?',
    content: 'TypeScript adds static type definitions to JavaScript, which can help catch errors early during development. It also provides better tooling and code completion in modern IDEs.'
  }
];

const App: React.FC = () => {
  return (
    <div style={{ maxWidth: '600px', margin: '40px auto' }}>
      <h1>React Accordion Example</h1>
      <Accordion items={accordionData} defaultExpanded="1" />
    </div>
  );
};

export default App;
```



# BASIC FETCH - WEATHER APP

#### App.tsx

```
// App.tsx
import React, { useState, useEffect } from 'react';

// TypeScript interfaces
interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
}

const App: React.FC = () => {
  // State declarations
  const [city, setCity] = useState<string>('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch weather data
  const fetchWeatherData = async () => {
    if (!city.trim()) return;

    setLoading(true);
    setError(null);

    try {
      // Note: In a real app, you'd want to store this API key in an environment variable
      const apiKey = 'API_KEY_HERE'; // Replace with a real API key
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data: WeatherData = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchWeatherData();
  };

  return (
    <div className="weather-app">
      <h1>Weather App</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Get Weather'}
        </button>
      </form>

      {error && <div className="error">{error}</div>}

      {weatherData && (
        <div className="weather-info">
          <h2>{weatherData.name}</h2>

          <div className="weather-main">
            <img
              src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt={weatherData.weather[0].description}
            />
            <div className="temperature">
              <h3>{Math.round(weatherData.main.temp)}°C</h3>
              <p>{weatherData.weather[0].main}</p>
              <p>{weatherData.weather[0].description}</p>
            </div>
          </div>

          <div className="weather-details">
            <div className="detail">
              <span>Feels Like</span>
              <span>{Math.round(weatherData.main.feels_like)}°C</span>
            </div>
            <div className="detail">
              <span>Humidity</span>
              <span>{weatherData.main.humidity}%</span>
            </div>
            <div className="detail">
              <span>Wind Speed</span>
              <span>{weatherData.wind.speed} m/s</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
```



# COUNTDOWN TIMER

#### App.tsx

```typescript
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
```



#### CountdownTimer.tsx

```typescript
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
```



# Calculator

#### App.tsx

```typescript
import React from 'react';
import Calculator from './Calculator';
import './App.css'

const App: React.FC = () => {
  return (
    <div >
      <h1 style={{ textAlign: 'center' }}>Calculator</h1>
      <Calculator />
    </div>
  );
};

export default App;
```

#### Calculator.tsx

```typescript
import React, { useState } from 'react';
import './styles.css';

type Operation = '+' | '-' | '*' | '/' | null;

const Calculator: React.FC = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<Operation>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const clearAll = (): void => {
    setDisplayValue('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const inputDigit = (digit: string): void => {
    if (waitingForOperand) {
      setDisplayValue(digit);
      setWaitingForOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? digit : displayValue + digit);
    }
  };

  const inputDecimal = (): void => {
    if (waitingForOperand) {
      setDisplayValue('0.');
      setWaitingForOperand(false);
      return;
    }

    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  };

  const performOperation = (nextOperation: Operation): void => {
    const inputValue = parseFloat(displayValue);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      let newValue: number;

      switch (operation) {
        case '+':
          newValue = currentValue + inputValue;
          break;
        case '-':
          newValue = currentValue - inputValue;
          break;
        case '*':
          newValue = currentValue * inputValue;
          break;
        case '/':
          newValue = currentValue / inputValue;
          break;
        default:
          newValue = inputValue;
      }

      setPreviousValue(newValue);
      setDisplayValue(String(newValue));
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const handleEquals = (): void => {
    if (!previousValue || !operation) return;
    
    performOperation(null);
  };

  return (
    <div className="calculator">
      <div className="calculator-display">{displayValue}</div>
      <div className="calculator-keypad">
        <div className="input-keys">
          <div className="function-keys">
            <button className="key-clear" onClick={clearAll}>AC</button>
          </div>
          <div className="digit-keys">
            <button onClick={() => inputDigit('7')}>7</button>
            <button onClick={() => inputDigit('8')}>8</button>
            <button onClick={() => inputDigit('9')}>9</button>
            <button onClick={() => inputDigit('4')}>4</button>
            <button onClick={() => inputDigit('5')}>5</button>
            <button onClick={() => inputDigit('6')}>6</button>
            <button onClick={() => inputDigit('1')}>1</button>
            <button onClick={() => inputDigit('2')}>2</button>
            <button onClick={() => inputDigit('3')}>3</button>
            <button onClick={() => inputDigit('0')}>0</button>
            <button onClick={inputDecimal}>.</button>
          </div>
        </div>
        <div className="operator-keys">
          <button onClick={() => performOperation('/')}>/</button>
          <button onClick={() => performOperation('*')}>×</button>
          <button onClick={() => performOperation('-')}>−</button>
          <button onClick={() => performOperation('+')}>+</button>
          <button onClick={handleEquals}>=</button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
```

#### App.css

```css
.calculator {
  width: 320px;
  margin: 0 auto;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.calculator-display {
  background-color: #333;
  color: white;
  text-align: right;
  padding: 20px 10px;
  font-size: 24px;
  font-family: monospace;
}

.calculator-keypad {
  display: grid;
  grid-template-columns: 3fr 1fr;
}

.function-keys {
  display: grid;
  grid-template-columns: 1fr;
}

.digit-keys {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.operator-keys {
  display: grid;
  grid-template-columns: 1fr;
  background-color: #f0f0f0;
}

button {
  height: 60px;
  font-size: 20px;
  border: 1px solid #ccc;
  background-color: white;
  cursor: pointer;
}

button:hover {
  background-color: #eee;
}

button:active {
  background-color: #ddd;
}

.operator-keys button {
  background-color: #f8f8f8;
}

.key-clear {
  background-color: #f0506e;
  color: white;
}
```



# Modal Component (pop up)

#### App.tsx

```typescript
import React, { useState } from 'react';
import Modal from './Modal';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  return (
    <div className="app">
      <h1>Modal Component Demo</h1>
      <button onClick={openModal}>Open Modal</button>
      
      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        title="Example Modal"
      >
        <p>This is an example of a reusable modal component.</p>
        <p>You can put any content here, including forms, images, or other components.</p>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default App;
```



#### Modal.tsx

```typescript
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

// TypeScript interface for Modal props
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

// Modal styles
const modalStyles = {
  overlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: '8px',
    maxWidth: '500px',
    width: '100%',
    padding: '20px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
  },
  header: {
    display: 'flex' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    marginBottom: '15px',
  },
  title: {
    margin: 0,
    fontSize: '20px',
    fontWeight: 'bold' as const,
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#666',
  },
  content: {
    maxHeight: '70vh',
    overflowY: 'auto' as const,
  },
};

const Modal = ({ isOpen, onClose, children, title }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Close modal when clicking outside
  const handleOutsideClick = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };
  
  // Close modal on Escape key press
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };
  
  useEffect(() => {
    if (isOpen) {
      // Add event listeners when modal is open
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleKeyDown);
      
      // Lock body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }
    
    // Cleanup function
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);
  
  // Don't render anything if modal is not open
  if (!isOpen) return null;
  
  // Use React Portal to render modal outside of normal DOM hierarchy
  return ReactDOM.createPortal(
    <div style={modalStyles.overlay} role="dialog" aria-modal="true">
      <div style={modalStyles.modal} ref={modalRef}>
        <div style={modalStyles.header}>
          {title && <h2 style={modalStyles.title}>{title}</h2>}
          <button 
            style={modalStyles.closeButton} 
            onClick={onClose}
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>
        <div style={modalStyles.content}>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
```



# Dropdown Component

#### App.tsx

```typescript
import React, { useState } from 'react';
import './App.css';
import Dropdown from './Dropdown';

interface Option {
  value: string;
  label: string;
}

const App: React.FC = () => {
  const options: Option[] = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'orange', label: 'Orange' },
    { value: 'grape', label: 'Grape' },
    { value: 'mango', label: 'Mango' },
  ];
  
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  
  const handleChange = (option: Option) => {
    setSelectedOption(option);
    console.log('Selected:', option);
  };
  
  return (
    <div className="app">
      <h1>Dropdown Component</h1>
      <div className="dropdown-wrapper">
        <h2>Select a Fruit:</h2>
        <Dropdown 
          options={options} 
          onChange={handleChange} 
          placeholder="Choose a fruit"
        />
      </div>
      
      {selectedOption && (
        <div className="selection-result">
          <p>You selected: {selectedOption.label}</p>
        </div>
      )}
    </div>
  );
};

export default App;
```

#### Dropdown.tsx

```typescript
import React, { useState, useRef, useEffect } from 'react';

interface Option {
  value: string;
  label: string;
}

interface DropdownProps {
  options: Option[];
  defaultOption?: Option;
  onChange?: (selectedOption: Option) => void;
  placeholder?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  defaultOption,
  onChange,
  placeholder = 'Select an option',
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(defaultOption || null);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Handle clicking outside of dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  const handleOptionSelect = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onChange) {
      onChange(option);
    }
  };
  
  return (
    <div className="dropdown-container" ref={dropdownRef}>
      <div 
        className="dropdown-header" 
        onClick={toggleDropdown}
      >
        <div className="dropdown-selected-value">
          {selectedOption ? selectedOption.label : placeholder}
        </div>
        <div className="dropdown-arrow">
          {isOpen ? '▲' : '▼'}
        </div>
      </div>
      
      {isOpen && (
        <ul className="dropdown-menu">
          {options.map((option) => (
            <li 
              key={option.value}
              onClick={() => handleOptionSelect(option)}
              className={`dropdown-item ${selectedOption?.value === option.value ? 'selected' : ''}`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
```

#### App.css

```typescript
.app {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.dropdown-wrapper {
  width: 300px;
  margin-bottom: 20px;
}

/* Dropdown Styles */
.dropdown-container {
  position: relative;
  width: 100%;
}

.dropdown-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 15px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
}

.dropdown-header:hover {
  background-color: #f7f7f7;
}

.dropdown-selected-value {
  font-size: 16px;
}

.dropdown-arrow {
  font-size: 12px;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  max-height: 200px;
  overflow-y: auto;
  padding: 0;
  margin: 0;
  list-style: none;
  background: white;
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 0 0 4px 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  z-index: 100;
}

.dropdown-item {
  padding: 10px 15px;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #f1f1f1;
}

.dropdown-item.selected {
  background-color: #e6f7ff;
  font-weight: bold;
}

.selection-result {
  margin-top: 20px;
  padding: 10px;
  background: #f7f7f7;
  border-radius: 4px;
}
```

