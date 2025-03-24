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