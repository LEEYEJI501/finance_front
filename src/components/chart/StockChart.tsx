"use client";

import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import annotationPlugin from 'chartjs-plugin-annotation';
import { Protocol, Stock } from '../../types/chartData';
import { getChartConfig } from './chartConfig';

Chart.register(annotationPlugin);

const StockChart: React.FC<{ data: Protocol }> = ({ data }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    const items: Stock[] = data.stocks.stocks;

    const labels = items.map(item => new Date(item.date).toLocaleDateString());
    const closingPrices = items.map(item => item.close_price);
    const volumes = items.map(item => item.volume);

    const movingAverage = (data: number[], period: number): (number | null)[] => {
      return data.map((value: number, index: number, arr: number[]): number | null => {
        if (index < period - 1) return null;
        const sum = arr.slice(index - period + 1, index + 1).reduce((a, b) => a + b, 0);
        return sum / period;
      });
    };

    const ma5 = movingAverage(closingPrices, 5);
    const ma20 = movingAverage(closingPrices, 20);
    const ma60 = movingAverage(closingPrices, 60);
    const ma120 = movingAverage(closingPrices, 120);

    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }

        const config = getChartConfig(labels, closingPrices, volumes, ma5, ma20, ma60, ma120);
        chartInstanceRef.current = new Chart(ctx, config);
      }
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data]);

  return <canvas ref={chartRef}></canvas>;
};

export default StockChart;
