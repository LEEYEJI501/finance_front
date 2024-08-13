import React, { useEffect, useState } from "react";
import { fetchStockList } from "@/services/stock";
import Table from "@/components/common/Table";
import { IStock } from "@/types/stock"

type TabContentProps = {
  market: string;
};

const TabContent: React.FC<TabContentProps> = ({ market }) => {
  const [stocks, setStocks] = useState<IStock[]>([]);

  useEffect(() => {
    const loadStockList = async () => {
      const { stocks } = await fetchStockList(market);
      setStocks(stocks);
    };

    loadStockList();
  }, [market]);

  const columns = [
    { key: 'code', header: 'Stock Code' },
    { key: 'name', header: 'Stock Name' },
  ];

  return (
    <div className="w-full">
      {stocks.length > 0 ? (
        <Table<IStock> columns={columns} data={stocks} />
      ) : (
        <p>No stocks available for {market}.</p>
      )}
    </div>
  );
};

export default TabContent;
