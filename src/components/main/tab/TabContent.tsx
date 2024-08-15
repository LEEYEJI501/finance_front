import React, { useState, useCallback } from 'react';
import Pagination from '@/components/common/Pagination';
import StockList from '@/components/main/tab/StockList';
import constants from '@/constants';
import { SearchInput, Modal } from '@/components/index';
import { fetchSearchStock } from '@/services/stock';

type TabContentProps = {
  market: string;
};

const TabContent: React.FC<TabContentProps> = ({ market }) => {
  const [currentPage, setCurrentPage] = useState(constants.DEFAULT_PAGING.PAGE);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(constants.DEFAULT_PAGING.PAGESIZE);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCategory, setSearchCategory] = useState('name');
  const [searchResults, setSearchResults] = useState<
    { code: string; name: string; market_name: string }[]
  >([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const searchOptions = ['name', 'code'];

  const debouncedSearch = useCallback(
    debounce(async (term: string) => {
      const results = await fetchSearchStock({
        term,
        category: searchCategory,
      });

      if (results && results.stocks) {
        setSearchResults(
          results.stocks.map((result: any) => ({
            code: result.code,
            name: result.name,
            market_name: result.market_name,
          })),
        );
        setIsModalOpen(true);
      } else {
        setSearchResults([]);
        setIsModalOpen(true);
      }
    }, 1000),
    [searchCategory, market],
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page - 1);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(0);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    debouncedSearch(term);
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchCategory(e.target.value);
  };

  const handleSelect = (option: {
    code: string;
    name: string;
    market_name: string;
  }) => {
    setSearchTerm(`${option.name} (${option.code})`);
    setIsModalOpen(false);
  };

  return (
    <div className="w-full relative">
      <div className="flex justify-center mb-6 relative">
        <div className="w-full md:w-4/5 relative">
          <SearchInput
            placeholder="검색어를 입력하세요"
            value={searchTerm}
            onChange={e => handleSearch(e.target.value)}
            searchOptions={searchOptions}
            selectedOption={searchCategory}
            onOptionChange={handleOptionChange}
            className="w-full"
          />
          <Modal
            options={searchResults}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSelect={handleSelect}
            searchTerm={searchTerm}
          />
        </div>
      </div>
      <StockList
        market={market}
        currentPage={currentPage}
        pageSize={pageSize}
        searchTerm={searchTerm}
        searchCategory={searchCategory}
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

function debounce<T extends (...args: any[]) => void>(func: T, wait: number) {
  let timeout: NodeJS.Timeout;
  return function (...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
