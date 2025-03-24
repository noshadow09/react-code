import { useState, useEffect } from 'react';

const Typewriter = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Animation timing constants
  const typingSpeed = 150;
  const deletingSpeed = 50;
  const pauseDuration = 1000;

  useEffect(() => {
    if (!text) return;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing phase
        if (currentIndex < text.length) {
          setDisplayText(text.substring(0, currentIndex + 1));
          setCurrentIndex(currentIndex + 1);
        } else {
          // Switch to deleting after pause
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      } else {
        // Deleting phase
        if (currentIndex > 0) {
          setDisplayText(text.substring(0, currentIndex - 1));
          setCurrentIndex(currentIndex - 1);
        } else {
          // Reset to typing after pause
          setTimeout(() => setIsDeleting(false), pauseDuration);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentIndex, isDeleting, text]);

  // Reset animation when text changes
  useEffect(() => {
    setCurrentIndex(0);
    setIsDeleting(false);
  }, [text]);

  return <div style={{ fontSize: '1.5rem', fontFamily: 'monospace' }}>{displayText}</div>;
};

export default Typewriter;