import React, { useState, useEffect } from 'react';

interface CarouselProps {
  slides: string[]; // Array of image URLs
  autoPlay?: boolean;
  interval?: number;
}

const Carousel: React.FC<CarouselProps> = ({ 
  slides, 
  autoPlay = false, 
  interval = 3000 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Function to go to the next slide
  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  // Function to go to the previous slide
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };
  
  // Function to go to a specific slide
  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };
  
  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay) return;
    
    const slideInterval = setInterval(goToNext, interval);
    return () => clearInterval(slideInterval);
  }, [autoPlay, interval]);
  
  // If no slides are provided, return null
  if (slides.length === 0) return null;
  
  return (
    <div className="carousel-container" style={{ position: 'relative', width: '100%', height: '400px', overflow: 'hidden' }}>
      {/* Main slide display */}
      <div className="carousel-slide" style={{ width: '100%', height: '100%' }}>
        <img 
          src={slides[currentIndex]} 
          alt={`Slide ${currentIndex + 1}`} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
      
      {/* Navigation buttons */}
      <button 
        onClick={goToPrevious}
        style={{
          position: 'absolute',
          top: '50%',
          left: '10px',
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(0,0,0,0.5)',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          cursor: 'pointer',
          fontSize: '20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        &lt;
      </button>
      
      <button 
        onClick={goToNext}
        style={{
          position: 'absolute',
          top: '50%',
          right: '10px',
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(0,0,0,0.5)',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          cursor: 'pointer',
          fontSize: '20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        &gt;
      </button>
      
      {/* Slide indicators */}
      <div 
        className="carousel-indicators"
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '8px'
        }}
      >
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: index === currentIndex ? 'white' : 'rgba(255,255,255,0.5)',
              border: 'none',
              cursor: 'pointer'
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
