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