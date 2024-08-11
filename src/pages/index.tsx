'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import StockChart from '../components/chart/StockChart';
import { IStockResponse, IStockData } from '../types/stock/chartData';
import { Button } from '../components';
import { useSockJS } from '@/hooks/useSockJS';
import { v4 as uuidv4 } from 'uuid';

const HomePage = () => {
  const { subscribe, send } = useSockJS();
  const [data, setData] = useState<IStockData[]>([]);
  const router = useRouter();
  const uniqueId = uuidv4();

  useEffect(() => {
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
        .replace('-', '');
      const currentMonthData = transformedData.filter((stock) =>
        stock.date.startsWith(currentMonth)
      );

      setData(currentMonthData);
    });

    send(`/app/initialData/KOSPI/005930/${uniqueId}`, { timeframe: '5years' });
  }, [subscribe, send]);

  const handleLoginClick = () => {
    router.push('/login');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex justify-end p-4">
        <Button
          size="medium"
          color="blue"
          purpose="primary"
          onClick={handleLoginClick}
        >
          로그인
        </Button>
      </header>
      <main className="flex-grow p-4">
        {data.length > 0 ? (
          <StockChart
            data={{
              stocks: {
                stock_code: '005930',
                market_name: 'KOSPI',
                stocks: data,
              },
            }}
          />
        ) : (
          <p>Loading...</p>
        )}
      </main>
    </div>
  );
};

export default HomePage;
