import { useRouter } from 'next/router';
import React from 'react';

const ChartPage = () => {
  const router = useRouter();
  const { market, code, name } = router.query;

  return (
    <div className="container">
      <h1>Market: {market}</h1>
      <h2>Code: {code}</h2>
      <p>Stock Name: {name}</p>
      {/* 여기서 code 값을 사용해 차트를 렌더링하거나 데이터를 불러올 수 있습니다 */}
    </div>
  );
};

export default ChartPage;
