import React, { useState } from "react";
import Pagination from "@/components/common/Pagination";
import StockList from "@/components/main/tab/StockList"; 
import constants from "@/constants";
import { SearchInput } from "@/components/index"

type TabContentProps = {
  market: string;
};

const TabContent: React.FC<TabContentProps> = ({ market }) => {
  const [currentPage, setCurrentPage] = useState(constants.DEFAULT_PAGING.PAGE);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(constants.DEFAULT_PAGING.PAGESIZE);
  const [searchTerm, setSearchTerm] = useState("");

  const handlePageChange = (page: number) => {
    setCurrentPage(page - 1); 
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(0); 
  };

  const handleSearch = () => {
    console.log("검색어:", searchTerm);
  };

  return (
    <div className="w-full">
      <div className="flex justify-center mb-6"> 
        <SearchInput
          placeholder="검색어를 입력하세요"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onSearch={handleSearch}
          size="medium"
          color="blue"
          buttonLabel="검색"
          className="w-full md:w-4/5"
        />
      </div>
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
