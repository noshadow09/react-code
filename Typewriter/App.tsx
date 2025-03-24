import { useState } from 'react';
import Typewriter from './Typewriter (Simple)';

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