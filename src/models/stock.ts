import {
    IStockData,
    IStockResponse,
    IStockInfoResponse,
    IAllStocksByMarketResponse,
    IMarketsResponse,
} from "@/types/stock";
import constants from "@/constants";

export const getStockListModel = (res: IAllStocksByMarketResponse) => {
    const results = res?.all_stocks_by_market ?? {
        market_name: constants.NONE,
        stocks: constants.DEFAULT_ITEMS,
        total_elements: constants.DEFAULT_NUM,
        total_pages: constants.DEFAULT_NUM
    }

    return results;
}

export const getMarketListModel = (res: IMarketsResponse) => {
    const markets = res?.markets ?? {}

    const results = markets?.markets ?? []

    return results
}