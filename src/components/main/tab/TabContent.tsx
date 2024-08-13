import React, { useState } from "react";
import Pagination from "@/components/common/Pagination";
import StockList from "@/components/main/tab/StockList"; 
import constants from "@/constants";

type TabContentProps = {
  market: string;
};

const TabContent: React.FC<TabContentProps> = ({ market }) => {
  const [currentPage, setCurrentPage] = useState(constants.DEFAULT_PAGING.PAGE);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(constants.DEFAULT_PAGING.PAGESIZE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page - 1); 
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(0); 
  };

  return (
    <div className="w-full">
      <StockList
        market={market}
        currentPage={currentPage}
        pageSize={pageSize}
        onTotalPagesChange={(totalPages: number) => setTotalPages(totalPages)} 
      />
      <Pagination
        currentPage={currentPage + 1}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        pageRangeDisplayed={5}
        pageSizeOptions={[10, 20, 50, 100]} 
      />
    </div>
  );
};

export default TabContent;
