export interface IStockData {
  date: string;
  volume: number;
  close_price: number;
  high_price: number;
  open_price: number;
  low_price: number;
}

export interface IStockResponse {
  stocks: {
    stock_code: string;
    market_name: string;
    stocks: IStockData[];
  };
}
