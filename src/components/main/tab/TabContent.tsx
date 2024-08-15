import React, { useState, useCallback } from 'react';
import Pagination from '@/components/common/Pagination';
import StockList from '@/components/main/tab/StockList';
import constants from '@/constants';
import { SearchInput, Modal } from '@/components/index';
import { fetchSearchStock } from '@/services/stock';
import useDebounce from '@/hooks/useDebounced';

type TabContentProps = {
  market: string;
};

const TabContent: React.FC<TabContentProps> = ({ market }) => {
  const [stockListPage, setStockListPage] = useState(
    constants.DEFAULT_PAGING.PAGE,
  );
  const [totalStockListPages, setTotalStockListPages] = useState(1);
  const [pageSize, setPageSize] = useState(constants.DEFAULT_PAGING.PAGESIZE);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCategory, setSearchCategory] = useState('name');
  const [searchResults, setSearchResults] = useState<
    { code: string; name: string; market_name: string }[]
  >([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPage, setModalPage] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const searchOptions = ['name', 'code'];

  const performSearch = useCallback(
    async (term: string) => {
      const results = await fetchSearchStock({
        term,
        category: searchCategory,
        page: 0,
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
        setModalPage(1);
      } else {
        setSearchResults([]);
        setIsModalOpen(true);
      }
    },
    [searchCategory],
  );

  const debouncedSearch = useDebounce(performSearch, 1000);

  const loadMore = useCallback(async () => {
    if (isLoadingMore || modalPage >= totalStockListPages) return;
    setIsLoadingMore(true);
    const results = await fetchSearchStock({
      term: searchTerm,
      category: searchCategory,
      page: 0,
    });

    if (results && results.stocks) {
      setSearchResults(prevResults => [
        ...prevResults,
        ...results.stocks.map((result: any) => ({
          code: result.code,
          name: result.name,
          market_name: result.market_name,
        })),
      ]);
      setModalPage(modalPage + 1);
    }
    setIsLoadingMore(false);
  }, [searchTerm, searchCategory, modalPage, isLoadingMore]);

  const handlePageChange = (page: number) => {
    setStockListPage(page - 1);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setStockListPage(0);
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
            loadMore={loadMore}
          />
        </div>
      </div>
      <StockList
        market={market}
        currentPage={stockListPage}
        pageSize={pageSize}
        searchTerm={searchTerm}
        searchCategory={searchCategory}
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
