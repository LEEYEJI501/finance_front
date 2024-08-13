import React, { useEffect, useState } from "react";
import { fetchStockList } from "@/services/stock";
import Table from "@/components/common/Table";
import { IStock } from "@/types/stock"
import { useRouter } from "next/router";

type TabContentProps = {
  market: string;
};

const TabContent: React.FC<TabContentProps> = ({ market }) => {
  const [stocks, setStocks] = useState<IStock[]>([]);
  const router = useRouter();

  useEffect(() => {
    const loadStockList = async () => {
      const { stocks } = await fetchStockList(market);
      setStocks(stocks);
    };

    loadStockList();
  }, [market]);

  const columns = [
    { key: 'name', header: 'Stock Name', hideHeader: true },
  ];

  const handleRowClick = (row: IStock) => {
    router.push("/");
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

export default TabContent;
