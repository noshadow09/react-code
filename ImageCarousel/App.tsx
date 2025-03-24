import React from 'react';
import Carousel from './Carousel';

const App: React.FC = () => {
  // Sample image URLs for the carousel
  const slides = [
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
    'https://images.unsplash.com/photo-1501785888041-af3ef285b470',
    'https://images.unsplash.com/photo-1530521954074-e64f6810b32d',
  ];

  return (
    <div className="app">
      <h1>Image Carousel</h1>
      <Carousel slides={slides} autoPlay={true} interval={5000} />
    </div>
  );
};

export default App;