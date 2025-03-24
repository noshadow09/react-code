import React from 'react';
import Accordion from './Accordian';

// Sample data for the accordion
const accordionData = [
  {
    id: '1',
    title: 'What is React?',
    content: 'React is a JavaScript library for building user interfaces. It allows developers to create large web applications that can change data, without reloading the page.'
  },
  {
    id: '2',
    title: 'How does the Accordion work?',
    content: 'The Accordion component uses React\'s useState hook to track which section is expanded. When a user clicks on a section header, it toggles the visibility of the content.'
  },
  {
    id: '3',
    title: 'Why use TypeScript with React?',
    content: 'TypeScript adds static type definitions to JavaScript, which can help catch errors early during development. It also provides better tooling and code completion in modern IDEs.'
  }
];

const App: React.FC = () => {
  return (
    <div style={{ maxWidth: '600px', margin: '40px auto' }}>
      <h1>React Accordion Example</h1>
      <Accordion items={accordionData} defaultExpanded="1" />
    </div>
  );
};

export default App; 