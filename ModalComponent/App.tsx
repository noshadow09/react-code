import React, { useState } from 'react';
import Modal from './Modal';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  return (
    <div className="app">
      <h1>Modal Component Demo</h1>
      <button onClick={openModal}>Open Modal</button>
      
      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        title="Example Modal"
      >
        <p>This is an example of a reusable modal component.</p>
        <p>You can put any content here, including forms, images, or other components.</p>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default App; 