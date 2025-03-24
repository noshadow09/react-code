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