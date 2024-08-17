import React, { useState } from "react";
import Pagination from "@/components/common/Pagination";
import StockList from "@/components/main/tab/StockList";
import constants from "@/constants";
import SortSelectBox from "./SortSelectBox";
import SearchSection from "@/components/main/tab/SearchSection";

type TabContentProps = {
  market: string;
};

const TabContent: React.FC<TabContentProps> = ({ market }) => {
  const [stockListPage, setStockListPage] = useState(
    constants.DEFAULT_PAGING.PAGE
  );
  const [totalStockListPages, setTotalStockListPages] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [sortOption, setSortOption] = useState('name,asc'); 

  const handlePageChange = (page: number) => {
    setStockListPage(page - 1);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setStockListPage(0);
  };

  const handleSortChange = (sort: string) => {
    setSortOption(sort);
    setStockListPage(0);  
  };

  return (
    <div className="w-full relative">
      <div className="flex justify-center mb-6 relative">
        <SearchSection />
      </div>
      <SortSelectBox onSortChange={handleSortChange} />
      <StockList
        market={market}
        currentPage={stockListPage}
        pageSize={pageSize}
        sortOption={sortOption}
        onTotalPagesChange={(totalPages: number) =>
          setTotalStockListPages(totalPages)
        }
      />
      <Pagination
        currentPage={stockListPage + 1}
        totalPages={totalStockListPages}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        pageRangeDisplayed={5}
        pageSizeOptions={[10, 20, 50, 100]}
      />
    </div>
  );
};

export default TabContent;
