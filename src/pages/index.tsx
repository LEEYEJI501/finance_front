import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import StockChart from "../components/chart/StockChart";
import { IStockData, IStockInfoResponse } from "../types/stock/chartData";
import { fetchStockInfoData } from "@/services/stock";
import { Button, Header } from "../components";
import { useSockJS } from "@/hooks/useSockJS";
import { v4 as uuidv4 } from "uuid";

const HomePage = () => {
  const { subscribe, send } = useSockJS();
  const [data, setData] = useState<IStockData[]>([]);
  const [stockName, setStockName] = useState<string>("");
  const [stockNames, setStockNames] = useState<
    { stock_code: string; stock_name: string }[]
  >([]);
  const router = useRouter();
  const uniqueId = uuidv4();

  useEffect(() => {
    const fetchData = async () => {
      const stockInfoResponse: IStockInfoResponse = await fetchStockInfoData();
      setStockNames(stockInfoResponse.stockNames);
      console.log(stockInfoResponse);

      subscribe(`/topic/initialData/KOSPI/005930/${uniqueId}`, (message) => {
        const stockData = JSON.parse(message.body);
        const transformedData: IStockData[] = stockData.stockData.map(
          (stock: any) => ({
            date: stock.date,
            volume: stock.volume,
            close_price: stock.closePrice,
            high_price: stock.highPrice,
            open_price: stock.openPrice,
            low_price: stock.lowPrice,
          })
        );

        const currentMonth = new Date()
          .toISOString()
          .slice(0, 7)
          .replace("-", "");
        const currentMonthData = transformedData.filter((stock) =>
          stock.date.startsWith(currentMonth)
        );

        const matchedStock = stockInfoResponse.stockNames.find(
          (item) => item.stock_code === stockData.code
        );

        if (matchedStock) {
          setStockName(matchedStock.stock_name);
        } else {
          setStockName("Unknown Stock");
        }

        setData(currentMonthData);
      });

      send(`/app/initialData/KOSPI/005930/${uniqueId}`, {
        timeframe: "5years",
      });
    };

    fetchData();
  }, [subscribe, send]);

  const handleLoginClick = () => {
    router.push("/login");
  };

  const handleStockClick = (stock_code: string) => {
    console.log(`Clicked on stock with code: ${stock_code}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header></Header>
      <main className="flex-grow p-4">
        <h1>{stockName}</h1>
        {data.length > 0 ? (
          <StockChart
            data={{
              stocks: {
                stock_code: "005930",
                market_name: "KOSPI",
                stocks: data,
              },
            }}
          />
        ) : (
          <p>Loading...</p>
        )}
        <div className="mt-4 w-4/5 mx-auto grid grid-cols-2 md:grid-cols-3 gap-4 justify-center">
          {stockNames.map((stock) => (
            <Button
              key={stock.stock_code}
              onClick={() => handleStockClick(stock.stock_code)}
              className="text-left w-full"
              color="none"
              size="medium"
            >
              {stock.stock_name} ({stock.stock_code})
            </Button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
