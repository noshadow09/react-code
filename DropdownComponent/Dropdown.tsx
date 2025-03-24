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