import { get } from '@/api';
import { IPaging } from '@/types/common';
import {
  IStockData,
  IStockResponse,
  IAllStocksByMarketResponse,
  IMarketsResponse,
  IStocksByNameResponse,
  IStocksByCodeResponse,
} from '@/types/stock';
import constants from '@/constants';
import {
  getStockListModel,
  getMarketListModel,
  getStocksByNameModel,
  getStocksByCodeModel,
} from '@/models/stock';

const STOCK_URL = 'stock';

export const fetchStockList = async (
  market: string,
  paging: IPaging = {
    page: constants.DEFAULT_PAGING.PAGE,
    pageSize: constants.DEFAULT_PAGING.PAGESIZE,
  },
) => {
  const response = await get<IAllStocksByMarketResponse>(
    `${STOCK_URL}/markets/${market}/securities?page=${paging.page}&pageSize=${paging.pageSize}&sort=name,asc`,
  );

  return getStockListModel(response);
};

export const fetchMarketList = async () => {
  const response = await get<IMarketsResponse>(`${STOCK_URL}/markets`);
  return getMarketListModel(response);
};

export const fetchSearchStock = async (data: {
  term: string;
  category: string;
}) => {
  const { term, category } = data;

  const apiUrl = (() => {
    if (category === 'name') {
      return `${STOCK_URL}/securities/search/name?page=0&pageSize=10&sort=name,asc&name=${term}`;
    } else if (category === 'code') {
      return `${STOCK_URL}/securities/search/code?page=0&pageSize=10&sort=name,asc&code=${term}`;
    } else {
      throw new Error('잘못된 검색 카테고리입니다.');
    }
  })();

  if (category === 'name') {
    const response = await get<IStocksByNameResponse>(apiUrl);
    return getStocksByNameModel(response);
  } else if (category === 'code') {
    const response = await get<IStocksByCodeResponse>(apiUrl);
    return getStocksByCodeModel(response);
  }
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
