import React, { useState } from 'react';
import Pagination from './Pagination';

interface ExampleItem {
  id: number;
  name: string;
}

const PaginationExample: React.FC = () => {
  // Generate sample data
  const generateData = (count: number): ExampleItem[] => {
    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      name: `Item ${i + 1}`
    }));
  };
  
  const allItems = generateData(87); // 87 sample items
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Calculate current items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allItems.slice(indexOfFirstItem, indexOfLastItem);
  
  // Change page
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  
  return (
    <div className="pagination-example">
      <h1>Paginated Items</h1>
      <p>Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, allItems.length)} of {allItems.length} items</p>
      
      <ul className="item-list">
        {currentItems.map(item => (
          <li key={item.id} className="item">
            {item.name}
          </li>
        ))}
      </ul>
      
      <Pagination
        totalItems={allItems.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default PaginationExample;