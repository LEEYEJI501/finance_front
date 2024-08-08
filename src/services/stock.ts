import { get } from '@/api'
import { IStockResponse } from '@/types/stock/chartData';

const STOCK_URL = 'stock';

export const fetchStockData = async (): Promise<IStockResponse> => {
  const response = await get<IStockResponse>(`${STOCK_URL}/markets/KOSPI/securities/code/005930/data?timeframe=5years`);
  return response;
};