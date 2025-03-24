import React from 'react';
import StarRating from './StarRating';

const App: React.FC = () => {
  const handleRatingChange = (newRating: number) => {
    console.log(`Selected rating: ${newRating}`);
  };

  return (
    <div className="App" style={{ padding: '20px' }}>
      <h1>Star Rating Component</h1>
      <div>
        <h3>Default (5 stars):</h3>
        <StarRating onChange={handleRatingChange} />
      </div>
      <div>
        <h3>Custom (10 stars, default rating 3):</h3>
        <StarRating maxRating={10} defaultRating={3} size={30} color="#ff5722" onChange={handleRatingChange} />
      </div>
    </div>
  );
};

export default App;