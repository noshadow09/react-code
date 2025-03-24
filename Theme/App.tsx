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