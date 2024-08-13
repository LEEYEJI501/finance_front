import React, { useState } from "react";
import Pagination from "@/components/common/Pagination";
import StockList from "@/components/main/tab/StockList"; 

type TabContentProps = {
  market: string;
};

const TabContent: React.FC<TabContentProps> = ({ market }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  return (
    <div className="w-full">
      <StockList
        market={market}
        currentPage={currentPage}
        pageSize={pageSize}
        onTotalPagesChange={(totalPages: number) => setTotalPages(totalPages)} 
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setCurrentPage(1); 
        }}
        pageRangeDisplayed={5}
        pageSizeOptions={[10, 20, 50, 100]} 
      />
    </div>
  );
};

export default TabContent;
