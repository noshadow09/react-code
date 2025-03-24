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