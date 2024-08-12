import { get } from "@/api";
import {
  IStockData,
  IStockResponse,
  IStockInfoResponse,
  IAllStocksByMarketResponse,
  IMarketsResponse,
} from "@/types/stock/chartData";

const STOCK_URL = "stock";

export const fetchStockData = async (): Promise<IStockResponse> => {
  const response = await get<IStockResponse>(
    `${STOCK_URL}/markets/KOSPI/securities/code/005930/data?timeframe=5years`
  );
  return response;
};

export const fetchStockInfoData = async (): Promise<IStockInfoResponse> => {
  const response = await get<IAllStocksByMarketResponse>(
    `${STOCK_URL}/markets/KOSPI/securities?page=0&pageSize=10&sort=name,asc`
  );

  const stockNames = response.all_stocks_by_market.stocks.map((stock) => ({
    stock_code: stock.code,
    stock_name: stock.name,
  }));

  return { stockNames };
};

export const fetchMarketList = async (): Promise<IMarketsResponse> => {
  const response = await get<IMarketsResponse>(`${STOCK_URL}/markets`);
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
