import { useState } from 'react';
import Typewriter from './Typewriter.tsx';

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