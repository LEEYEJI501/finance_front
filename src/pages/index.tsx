'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import StockChart from '../components/chart/StockChart';
import { fetchStockData } from '@/services/stock';
import { IStockResponse } from '../types/stock/chartData';
import { Button } from '../components';
import { useSockJS } from '@/hooks/useSockJS';

const HomePage = () => {
  const { subscribe, send } = useSockJS();
  const [data, setData] = useState<IStockResponse | null>(null);
  const router = useRouter();

  useEffect(() => {
    subscribe('/topic/initialData/KOSPI/005930', (message) => {
      console.log('Initial data update:', message.body);
    });

    send('/app/initialData/KOSPI/005930', { timeframe: '5years' });
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
        {data ? <StockChart data={data} /> : <p>Loading...</p>}
      </main>
    </div>
  );
};

export default HomePage;
