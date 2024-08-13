import { useRouter } from 'next/router';
import React, { useEffect, useState } from "react";
import { Chart } from "@/components/index"
import { v4 as uuidv4 } from "uuid";
import { useSockJS } from "@/hooks/useSockJS";
import { IStockData } from "@/types/stock";
import constants from '@/constants';

const ChartPage = () => {
  const router = useRouter();
  const { market, code, name } = router.query;
  const uniqueId = uuidv4();
  const { subscribe, send } = useSockJS();

  useEffect(() => {
    const fetchData = async () => {
      subscribe(`/topic/initialData/${market}/${code}/${uniqueId}`, (message) => {
        const stockData = JSON.parse(message.body);
        console.log(stockData)
        // const transformedData: IStockData[] = stockData.stockData.map(
        //   (stock: any) => ({
        //     date: stock.date,
        //     volume: stock.volume,
        //     close_price: stock.closePrice,
        //     high_price: stock.highPrice,
        //     open_price: stock.openPrice,
        //     low_price: stock.lowPrice,
        //   })
        // )
      });

      send(`/app/initialData/${market}/${code}/${uniqueId}`, {
        timeframe: constants.STOCK_DATA_TIME['5YEARS'],
      });
    };

    fetchData();
  }, [subscribe, send]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-lg p-6">
        <h1 className="text-lg mb-2">{name}</h1>
        <h2 className="text-3xl font-bold mb-2">{} 원</h2>
        {/* <p className="mb-6">0 (0.0%)</p> */}

        {/* ChartComponent 사용 */}
        <Chart />

        {/* 하단 버튼들 */}
        <div className="flex justify-between mt-4">
          <button>1일</button>
          <button>1주일</button>
          <button>1개월</button>
          <button>3개월</button>
          <button className="bg-pink-500 rounded px-4 py-1">1년</button>
          <button>전체</button>
        </div>
      </div>
    </div>
  );
};

export default ChartPage;
