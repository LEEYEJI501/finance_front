'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import StockChart from '../components/chart/StockChart';
import { fetchStockData } from '../api/stock/fetchStockData';
import { IStockResponse } from '../types/stock/chartData';
import { Button } from '../components';

const HomePage = () => {
  const [data, setData] = useState<IStockResponse | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      try {
        const stockData = await fetchStockData();
        setData(stockData);
      } catch (error) {
        console.error('Failed to fetch stock data:', error);
      }
    };

    getData();
  }, []);

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
        {data ? <StockChart data={data} /> : <p>Loading...</p>}
      </main>
    </div>
  );
};

export default HomePage;
