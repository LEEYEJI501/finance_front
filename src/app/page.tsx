"use client";

import React, { useEffect, useState } from 'react';
import StockChart from '../components/chart/StockChart';
import { fetchStockData } from '../api/fetchStockData';
import { Protocol } from '../types/chartData';

const HomePage = () => {
  const [data, setData] = useState<Protocol | null>(null);

  useEffect(() => {
    const getData = async () => {
      console.log('Calling fetchStockData');
      try {
        const stockData = await fetchStockData();
        console.log('Stock data received:', stockData);
        setData(stockData);
      } catch (error) {
        console.error('Failed to fetch stock data:', error);
      }
    };

    getData();
  }, []);

  return (
    <div>
      <h1>Stock Chart with Moving Averages and Volume</h1>
      {data ? <StockChart data={data} /> : <p>Loading...</p>}
    </div>
  );
};

export default HomePage;