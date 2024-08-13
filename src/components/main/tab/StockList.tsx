import React, { useEffect, useState } from "react";
import { fetchStockList } from "@/services/stock";
import Table from "@/components/common/Table";
import { IStock } from "@/types/stock";
import { useRouter } from "next/router";
import constants from "@/constants";

type StockListProps = {
  market: string;
  currentPage: number;
  pageSize: number;
  onTotalPagesChange: (totalPages: number) => void;
};

const StockList: React.FC<StockListProps> = ({ market, currentPage, pageSize, onTotalPagesChange }) => {
  const [stocks, setStocks] = useState<IStock[]>([]);
  const router = useRouter();

  useEffect(() => {
    const loadStockList = async () => {
        const { stocks, total_pages } = await fetchStockList(market, {
            page: currentPage,
            pageSize: 20
        });
        setStocks(stocks);
        onTotalPagesChange(total_pages)
    };

    loadStockList();
  }, [market, currentPage, pageSize, onTotalPagesChange]);

  const columns = [
    { key: 'name', header: 'Stock Name', hideHeader: true },
  ];

  const handleRowClick = (row: IStock) => {
    router.push({
      pathname: `/${row.market_name}/${row.code}`,
      query: { name: row.name },
    });
  };

  return (
    <div className="w-full">
      {stocks.length > 0 ? (
        <Table<IStock> columns={columns} data={stocks} onRowClick={handleRowClick} />
      ) : (
        <p>No stocks available for {market}.</p>
      )}
    </div>
  );
};

export default StockList;
