import { useState, useEffect } from 'react';

const Typewriter = ({ 
  text, 
  start, 
  onComplete 
}: { 
  text: string;
  start: boolean;
  onComplete: () => void;
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const typingSpeed = 150;
  const resetDelay = 1000;

  useEffect(() => {
    if (!text || !start) return;

    const timeout = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText(text.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      } else {
        setTimeout(() => {
          setDisplayText('');
          setCurrentIndex(0);
          onComplete();
        }, resetDelay);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentIndex, text, start, onComplete]);

  useEffect(() => {
    setCurrentIndex(0);
    setDisplayText('');
  }, [text]);

  return <div style={{ fontSize: '1.5rem', fontFamily: 'monospace' }}>{displayText}</div>;
};

export default Typewriter;
