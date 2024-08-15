import React, { useState, useCallback, useRef } from 'react';
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
  const [hasMoreResults, setHasMoreResults] = useState(true);

  const performSearch = useCallback(
    async (term: string) => {
      setModalPage(0); // 새 검색어가 입력되면 페이지를 0으로 초기화
      const results = await fetchSearchStock({
        term,
        category: searchCategory,
        page: 0, // 초기 페이지는 0
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
        setModalPage(1); // 다음 페이지를 로드할 준비를 위해 modalPage를 1로 설정
        setHasMoreResults(results.stocks.length > 0);
      } else {
        setSearchResults([]);
        setIsModalOpen(true);
        setHasMoreResults(false);
      }
    },
    [searchCategory],
  );

  const debouncedSearch = useDebounce(performSearch, 1000);

  const loadMore = useCallback(async () => {
    if (isLoadingMore || !hasMoreResults) return;
    setIsLoadingMore(true);
    const results = await fetchSearchStock({
      term: searchTerm,
      category: searchCategory,
      page: modalPage, // 현재 페이지를 사용하여 요청
    });

    if (results && results.stocks) {
      const newResults = results.stocks.map((result: any) => ({
        code: result.code,
        name: result.name,
        market_name: result.market_name,
      }));

      setSearchResults(prevResults => {
        const updatedResults = [...prevResults, ...newResults];
        return updatedResults.filter(
          (item, index, self) =>
            index ===
            self.findIndex(
              t => t.code === item.code && t.market_name === item.market_name,
            ),
        );
      });

      setModalPage(modalPage + 1); // 다음 페이지를 로드할 준비를 위해 페이지 증가
      setHasMoreResults(newResults.length > 0); // 추가 데이터가 있는 경우에만 더 로드
    } else {
      setHasMoreResults(false); // 더 이상 로드할 데이터가 없으므로 로드 중지
    }
    setIsLoadingMore(false);
  }, [searchTerm, searchCategory, modalPage, isLoadingMore, hasMoreResults]);

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
            loadMore={loadMore} // 스크롤 이벤트에 의해 호출될 loadMore 함수
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
