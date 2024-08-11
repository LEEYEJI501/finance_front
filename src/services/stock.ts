import { get } from '@/api';
import { IStockData, IStockResponse } from '@/types/stock/chartData';

const STOCK_URL = 'stock';

export const fetchStockData = async (): Promise<IStockResponse> => {
  const response = await get<IStockResponse>(
    `${STOCK_URL}/markets/KOSPI/securities/code/005930/data?timeframe=5years`
  );
  return response;
};

export const parseStockData = (data: any): IStockResponse => {
  const parsedStocks: IStockData[] = data.stockData.map((item: any) => ({
    date: item.date,
    volume: item.volume,
    close_price: item.closePrice,
    high_price: item.highPrice,
    open_price: item.openPrice,
    low_price: item.lowPrice,
  }));

  return {
    stocks: {
      stock_code: data.code,
      market_name: data.marketName,
      stocks: parsedStocks,
    },
  };
};
