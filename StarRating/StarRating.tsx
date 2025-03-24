import React, { useState } from 'react';

interface StarRatingProps {
  maxRating?: number;
  defaultRating?: number;
  onChange?: (rating: number) => void;
  size?: number;
  color?: string;
}

const StarRating: React.FC<StarRatingProps> = ({
  maxRating = 5,
  defaultRating = 0,
  onChange,
  size = 24,
  color = '#ffc107', // Default gold color
}) => {
  const [rating, setRating] = useState<number>(defaultRating);
  const [hoverRating, setHoverRating] = useState<number>(0);

  const handleClick = (selectedRating: number) => {
    setRating(selectedRating);
    if (onChange) {
      onChange(selectedRating);
    }
  };

  const handleMouseEnter = (starIndex: number) => {
    setHoverRating(starIndex);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const renderStar = (index: number) => {
    const filled = index <= (hoverRating || rating);

    return (
      <span
        key={index}
        onClick={() => handleClick(index)}
        onMouseEnter={() => handleMouseEnter(index)}
        style={{
          cursor: 'pointer',
          color: filled ? color : '#e4e5e9',
          fontSize: `${size}px`,
          transition: 'color 0.2s ease-in-out',
        }}
      >
        ★
      </span>
    );
  };

  return (
    <div
      className="star-rating"
      onMouseLeave={handleMouseLeave}
      style={{ display: 'inline-flex' }}
    >
      {[...Array(maxRating)].map((_, index) => renderStar(index + 1))}
      <span style={{ marginLeft: '8px', fontSize: `${size * 0.8}px` }}>
        {hoverRating || rating || ''}
      </span>
    </div>
  );
};

export default StarRating;