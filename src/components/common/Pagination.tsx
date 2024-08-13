import React from "react";
import Button from "@/components/common/Button";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void; 
  pageSizeOptions?: number[]; 
  pageRangeDisplayed?: number; 
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 50], 
  pageRangeDisplayed = 5, 
}) => {
  const handleFirst = () => onPageChange(1);
  const handleLast = () => onPageChange(totalPages);
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => onPageChange(page);

  const renderPageNumbers = () => {
    const pages = [];
    const halfRange = Math.floor(pageRangeDisplayed / 2);
    let startPage = Math.max(1, currentPage - halfRange);
    let endPage = Math.min(totalPages, currentPage + halfRange);

    if (endPage - startPage + 1 < pageRangeDisplayed) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, endPage + (pageRangeDisplayed - (endPage - startPage + 1)));
      } else {
        startPage = Math.max(1, startPage - (pageRangeDisplayed - (endPage - startPage + 1)));
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button
          key={i}
          onClick={() => handlePageClick(i)}
          color={i === currentPage ? "blue" : "none"}
          purpose="secondary"
        >
          {i}
        </Button>
      );
    }

    return pages;
  };

  return (
    <div className="flex justify-center items-center space-x-2 mt-4">
      <Button onClick={handleFirst} disabled={currentPage === 1}>
        First
      </Button>
      <Button onClick={handlePrevious} disabled={currentPage === 1}>
        Previous
      </Button>
      {renderPageNumbers()}
      <Button onClick={handleNext} disabled={currentPage === totalPages}>
        Next
      </Button>
      <Button onClick={handleLast} disabled={currentPage === totalPages}>
        Last
      </Button>
      {onPageSizeChange && (
        <select
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="ml-4 p-2 border rounded"
        >
          {pageSizeOptions.map((size) => (
            <option key={size} value={size}>
              {size} per page
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default Pagination;
