import React, { useState } from 'react';

// Define types for our accordion data
interface AccordionItem {
  id: string;
  title: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItem[];
  defaultExpanded?: string | null;
}

const Accordion: React.FC<AccordionProps> = ({ items, defaultExpanded = null }) => {
  // State to track which item is expanded
  const [expandedId, setExpandedId] = useState<string | null>(defaultExpanded);

  // Toggle function for expanding/collapsing items
  const toggleItem = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="accordion">
      {items.map((item) => {
        const isExpanded = expandedId === item.id;
        
        return (
          <div key={item.id} className="accordion-item">
            <div 
              className="accordion-header"
              onClick={() => toggleItem(item.id)}
              style={{
                padding: '12px 16px',
                backgroundColor: '#f1f1f1',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid #ddd'
              }}
            >
              <h3 style={{ margin: 0 }}>{item.title}</h3>
              <span>{isExpanded ? '▲' : '▼'}</span>
            </div>
            
            {isExpanded && (
              <div 
                className="accordion-content"
                style={{
                  padding: '16px',
                  borderBottom: '1px solid #ddd'
                }}
              >
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Accordion; 