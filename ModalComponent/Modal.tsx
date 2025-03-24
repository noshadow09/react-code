import React, { ReactNode, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

// TypeScript interface for Modal props
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

// Modal styles
const modalStyles = {
  overlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: '8px',
    maxWidth: '500px',
    width: '100%',
    padding: '20px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
  },
  header: {
    display: 'flex' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    marginBottom: '15px',
  },
  title: {
    margin: 0,
    fontSize: '20px',
    fontWeight: 'bold' as const,
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#666',
  },
  content: {
    maxHeight: '70vh',
    overflowY: 'auto' as const,
  },
};

const Modal = ({ isOpen, onClose, children, title }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Close modal when clicking outside
  const handleOutsideClick = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };
  
  // Close modal on Escape key press
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };
  
  useEffect(() => {
    if (isOpen) {
      // Add event listeners when modal is open
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleKeyDown);
      
      // Lock body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }
    
    // Cleanup function
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);
  
  // Don't render anything if modal is not open
  if (!isOpen) return null;
  
  // Use React Portal to render modal outside of normal DOM hierarchy
  return ReactDOM.createPortal(
    <div style={modalStyles.overlay} role="dialog" aria-modal="true">
      <div style={modalStyles.modal} ref={modalRef}>
        <div style={modalStyles.header}>
          {title && <h2 style={modalStyles.title}>{title}</h2>}
          <button 
            style={modalStyles.closeButton} 
            onClick={onClose}
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>
        <div style={modalStyles.content}>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal; 