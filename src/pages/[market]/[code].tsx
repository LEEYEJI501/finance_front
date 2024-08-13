import { useRouter } from 'next/router';
import React, { useEffect, useState } from "react";
import { Chart } from "@/components/index";
import { v4 as uuidv4 } from "uuid";
import { useSockJS } from "@/hooks/useSockJS";
import constants from '@/constants';

const ChartPage = () => {
  const router = useRouter();
  const { market, code, name } = router.query;
  const uniqueId = uuidv4();
  const { subscribe, send } = useSockJS();
  const [stockData, setStockData] = useState([]);
  const [timeframe, setTimeframe] = useState(constants.STOCK_DATA_TIME['1MONTH']);
  const [selectedTimeframe, setSelectedTimeframe] = useState('1MONTH');

  useEffect(() => {
    const fetchData = async () => {
      subscribe(`/topic/initialData/${market}/${code}/${uniqueId}`, (message) => {
        const stockData = JSON.parse(message.body);
        setStockData(stockData.stockData);
      });

      send(`/app/initialData/${market}/${code}/${uniqueId}`, {
        timeframe: timeframe,
      });
    };

    if (market && code && name) {
      fetchData();
    }
  }, [market, code, name, subscribe, send, timeframe]); 

  const handleTimeframeChange = (newTimeframe: string, timeframeKey: string) => {
    setTimeframe(newTimeframe);
    setSelectedTimeframe(timeframeKey);
  };

  const getButtonClass = (timeframeKey: string) => {
    return selectedTimeframe === timeframeKey
      ? "bg-pink-500 rounded px-4 py-1 text-white"
      : "text-black";
  };

  const latestClosePrice = stockData.length > 0 ? stockData[stockData.length - 1].closePrice : constants.DEFAULT_NUM;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-5xl p-8">
        <h1 className="text-lg mb-2 bg-gray-100 text-black rounded-full px-4 py-1 inline-block">
          {name}
        </h1>
        <h2 className="text-3xl font-bold mb-4">
          {latestClosePrice !== null ? `${formatPrice(latestClosePrice)}` : ''}
          <span className='text-sm'> 원</span>
        </h2>

        <Chart stockData={stockData} />

        <div className="flex justify-between mt-4">
          <button 
            onClick={() => handleTimeframeChange(constants.STOCK_DATA_TIME['1MONTH'], '1MONTH')}
            className={getButtonClass('1MONTH')}
          >
            1개월
          </button>
          <button 
            onClick={() => handleTimeframeChange(constants.STOCK_DATA_TIME['1YEAR'], '1YEAR')}
            className={getButtonClass('1YEAR')}
          >
            1년
          </button>
          <button 
            onClick={() => handleTimeframeChange(constants.STOCK_DATA_TIME['3YEARS'], '3YEARS')}
            className={getButtonClass('3YEARS')}
          >
            3년
          </button>
          <button 
            onClick={() => handleTimeframeChange(constants.STOCK_DATA_TIME['5YEARS'], '5YEARS')}
            className={getButtonClass('5YEARS')}
          >
            5년
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChartPage;
