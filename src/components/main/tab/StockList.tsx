import React, { useEffect, useState } from 'react';
import { fetchStockList } from '@/services/stock';
import { IStock } from '@/types/stock';
import { useNavigate } from '@/hooks/useNavigate';
import { Card } from '@/components/index';

type StockListProps = {
  market: string;
  currentPage: number;
  pageSize: number;
  onTotalPagesChange: (totalPages: number) => void;
  searchTerm?: string;
  searchCategory?: string;
};

const StockList: React.FC<StockListProps> = ({
  market,
  currentPage,
  pageSize,
  onTotalPagesChange,
  searchTerm = '',
  searchCategory = 'Name',
}) => {
  const [stocks, setStocks] = useState<IStock[]>([]);
  const { navigateToStockDetail } = useNavigate();

  useEffect(() => {
    const loadStockList = async () => {
      const { stocks, total_pages } = await fetchStockList(market, {
        page: currentPage,
        pageSize,
        searchTerm,
        searchCategory,
      });
      setStocks(stocks);
      onTotalPagesChange(total_pages);
    };

    loadStockList();
  }, [
    market,
    currentPage,
    pageSize,
    searchTerm,
    searchCategory,
    onTotalPagesChange,
  ]);

  const handleCardClick = (stock: IStock) => {
    navigateToStockDetail({
      market: stock.market_name,
      code: stock.code,
      name: stock.name,
    });
  };

  return (
    <div className="w-4/5 mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
      {stocks.length > 0 ? (
        stocks.map(stock => (
          <Card
            key={stock.code}
            title={stock.name}
            onClick={() => handleCardClick(stock)}
          />
        ))
      ) : (
        <p>No stocks available for {market}.</p>
      )}
    </div>
  );
};

export default StockList;
