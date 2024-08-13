import { get } from "@/api";
import { IPaging } from "@/types/common";
import {
  IStockData,
  IStockResponse,
  IAllStocksByMarketResponse,
  IMarketsResponse,
} from "@/types/stock";
import constants from "@/constants";
import { getStockListModel, getMarketListModel } from "@/models/stock";

const STOCK_URL = "stock";

export const fetchStockList = async (
  market: string, 
  paging: IPaging = { 
    page: constants.DEFAULT_PAGING.PAGE, 
    pageSize: constants.DEFAULT_PAGING.PAGESIZE 
  }) => {
  const response = await get<IAllStocksByMarketResponse>(
    `${STOCK_URL}/markets/${market}/securities?page=${paging.page}&pageSize=${paging.pageSize}&sort=name,asc`
  );

  return getStockListModel(response);
};

export const fetchMarketList = async () => {
  const response = await get<IMarketsResponse>(`${STOCK_URL}/markets`);
  return getMarketListModel(response);
};

export const fetchStockDetail = async () => {
  
}


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
