import React, { useState, useEffect } from 'react';
import './styles.css'; // We'll define this separately

interface CardProps {
  title: string;
  content: string;
}

const Card: React.FC<CardProps> = ({ title, content }) => {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
};

const ResponsiveLayout: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      setSidebarOpen(window.innerWidth >= 768);
    };

    // Initial check
    checkScreenSize();

    // Add event listener
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const navItems = ['Home', 'Products', 'Services', 'About', 'Contact'];
  
  // Sample content for grid cards
  const cardData = [
    { title: 'Card 1', content: 'This is the content for card 1.' },
    { title: 'Card 2', content: 'This is the content for card 2.' },
    { title: 'Card 3', content: 'This is the content for card 3.' },
    { title: 'Card 4', content: 'This is the content for card 4.' },
    { title: 'Card 5', content: 'This is the content for card 5.' },
    { title: 'Card 6', content: 'This is the content for card 6.' },
  ];

  return (
    <div className="layout-container">
      <header className="header">
        <div className="logo">ResponsiveApp</div>
        {isMobile && (
          <button className="menu-toggle" onClick={toggleSidebar}>
            {sidebarOpen ? '✕' : '☰'}
          </button>
        )}
      </header>
      
      <div className="main-container">
        <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
          <nav>
            <ul>
              {navItems.map((item, index) => (
                <li key={index}>
                  <a href="#">{item}</a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        
        <main className="content">
          <h1>Responsive Layout Example</h1>
          <p className="intro">
            This layout demonstrates responsive design principles using CSS Grid, 
            Flexbox, and media queries. Resize your browser to see how the layout adjusts.
          </p>
          
          <div className="card-grid">
            {cardData.map((card, index) => (
              <Card key={index} title={card.title} content={card.content} />
            ))}
          </div>
        </main>
      </div>
      
      <footer className="footer">
        <p>© 2025 ResponsiveApp. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ResponsiveLayout;