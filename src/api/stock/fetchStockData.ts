import { get } from '../index';
import { IStockResponse } from '../../types/stock/chartData';

export const fetchStockData = async (): Promise<IStockResponse> => {
  const response = await get<IStockResponse>(
    '/stock/markets/KOSPI/securities/code/005930/data?timeframe=5years'
  );
  console.log(response);
  return response;
};
