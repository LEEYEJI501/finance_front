import React, { useEffect, useState } from "react";
import Link from "next/link";
import { fetchMarketList } from "@/services/stock";
import { IMarket, IMarketsResponse } from "@/types/stock/chartData";
import { Button } from "@/components/index"; // Button 컴포넌트를 가져옵니다.

const Menu: React.FC = () => {
  const [markets, setMarkets] = useState<IMarket[]>([]);
  const [activeMarket, setActiveMarket] = useState<string | null>(null);

  useEffect(() => {
    const loadMarketList = async () => {
      try {
        const response: IMarketsResponse = await fetchMarketList();
        setMarkets(response.markets.markets);
        if (response.markets.markets.length > 0) {
          setActiveMarket(response.markets.markets[0].name);
        }
      } catch (error) {
        console.error("Failed to fetch market list:", error);
      }
    };

    loadMarketList();
  }, []);

  const handleMarketClick = (marketName: string) => {
    setActiveMarket(marketName);
  };

  return (
    <nav className="bg-white py-2">
      <div className="flex justify-around border-b border-gray-300">
        {markets.map((market) => (
          <div
            key={market.name}
            className={`flex-1 text-center ${
              market.name === activeMarket ? "border-b-2 border-black" : ""
            }`}
          >
            <Link href={`/${market.name.toLowerCase()}`}>
              <Button
                color="none"
                onClick={() => handleMarketClick(market.name)}
                className={`${
                  market.name === activeMarket
                    ? "text-black"
                    : "text-gray-500 hover:text-black"
                } pb-2`}
              >
                {market.name}
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Menu;
