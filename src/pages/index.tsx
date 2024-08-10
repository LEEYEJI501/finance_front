'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import StockChart from '../components/chart/StockChart';
import { IStockResponse } from '../types/stock/chartData';
import { Button } from '../components';
import { useSockJS } from '@/hooks/useSockJS';
import { v4 as uuidv4 } from 'uuid';

const HomePage = () => {
  const { subscribe, send } = useSockJS();
  const [data, setData] = useState<IStockResponse | null>(null);
  const router = useRouter();
  const uniqueId = uuidv4();

  useEffect(() => {
    subscribe(`/topic/initialData/KOSPI/005930/${uniqueId}`, (message) => {
      console.log('Initial data update:', message.body);
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
        {data ? <StockChart data={data} /> : <p>Loading...</p>}
      </main>
    </div>
  );
};

export default HomePage;
