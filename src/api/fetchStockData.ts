import ky from 'ky';
import { Protocol } from '../types/chartData';

export const fetchStockData = async (): Promise<Protocol> => {
  console.log('Fetching stock data');
  const response = await ky.get('/api/stockdata').json<Protocol>();
  console.log('Stock data fetched:', response);
  return response;
};