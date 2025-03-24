import { useState, useEffect } from 'react';

const Typewriter = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Animation timing constants
  const typingSpeed = 150;
  const resetDelay = 1000; // Time before reset

  useEffect(() => {
    if (!text) return;

    const timeout = setTimeout(() => {
      // Typing phase
      if (currentIndex < text.length) {
        setDisplayText(text.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      } else {
        // Reset text to empty after typing is complete
        setTimeout(() => {
          setDisplayText('');
          setCurrentIndex(0); // Reset index for the next text
        }, resetDelay);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentIndex, text]);

  // Reset animation when text changes
  useEffect(() => {
    setCurrentIndex(0);
    setDisplayText('');
  }, [text]);

  return <div style={{ fontSize: '1.5rem', fontFamily: 'monospace' }}>{displayText}</div>;
};

export default Typewriter;
