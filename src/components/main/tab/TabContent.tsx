import React, { useEffect, useState } from "react";
import { fetchStockList } from "@/services/stock";

type TabContentProps = {
    market: string;
}

const TabContent: React.FC<TabContentProps> = ({ market }) => {
    const [stocks, setStocks] = useState<{
        stock_code: string;
        stock_name: string;
    }[]>([]); 

    useEffect(() => {
        const loadStockList = async () => {
            const { stockNames } = await fetchStockList(market);
            setStocks(stockNames);
        };
    
        loadStockList();
    }, []);

    return (
        <div className="w-full">
            test
        </div>
    );
};

export default TabContent;
