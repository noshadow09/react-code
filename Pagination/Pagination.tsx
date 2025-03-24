import React from 'react';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  maxPageButtons?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  maxPageButtons = 5,
}) => {
  // Calculate total pages
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // Return null if we have only one page
  if (totalPages <= 1) {
    return null;
  }
  
  // Function to generate page numbers to display
  const getPageNumbers = () => {
    // If we have fewer pages than the max buttons, show all pages
    if (totalPages <= maxPageButtons) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    // Calculate the range of pages to show
    const halfButtons = Math.floor(maxPageButtons / 2);
    let startPage = Math.max(currentPage - halfButtons, 1);
    let endPage = startPage + maxPageButtons - 1;
    
    // Adjust if we're near the end
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(endPage - maxPageButtons + 1, 1);
    }
    
    // Create the page number array
    const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    
    // Add ellipsis indicators
    if (startPage > 1) {
      pages.unshift(-1); // -1 represents an ellipsis
      pages.unshift(1);  // Always show first page
    }
    
    if (endPage < totalPages) {
      pages.push(-2);      // -2 represents an ellipsis
      pages.push(totalPages); // Always show last page
    }
    
    return pages;
  };
  
  // Handle page change
  const handlePageChange = (page: number) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };
  
  const pageNumbers = getPageNumbers();
  
  return (
    <div className="pagination">
      {/* First page button */}
      <button 
        className="pagination-button"
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
      >
        &laquo;
      </button>
      
      {/* Previous page button */}
      <button 
        className="pagination-button"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lsaquo;
      </button>
      
      {/* Page number buttons */}
      {pageNumbers.map((page, index) => {
        // Render ellipsis
        if (page < 0) {
          return <span key={index} className="pagination-ellipsis">&hellip;</span>;
        }
        
        // Render page button
        return (
          <button
            key={index}
            className={`pagination-button ${currentPage === page ? 'active' : ''}`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        );
      })}
      
      {/* Next page button */}
      <button 
        className="pagination-button"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &rsaquo;
      </button>
      
      {/* Last page button */}
      <button 
        className="pagination-button"
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        &raquo;
      </button>
    </div>
  );
};

export default Pagination;