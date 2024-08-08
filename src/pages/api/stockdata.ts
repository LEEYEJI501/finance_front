import type { NextApiRequest, NextApiResponse } from 'next';
import ky from 'ky';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const apiToken = process.env.NEXT_PUBLIC_API_TOKEN;

  console.log('API URL:', apiUrl);
  console.log('API Token:', apiToken);

  if (!apiUrl || !apiToken) {
    return res.status(500).json({ error: 'API URL or Token is not defined' });
  }

  const apiEndpoint = `${apiUrl}/v1/stock/markets/KOSPI/securities/code/005930/data?timeframe=5years`;

  try {
    const data = await ky.get(apiEndpoint, {
      headers: {
        'Authorization': `Bearer ${apiToken}`,
      },
    }).json();

    console.log('API response data:', data);
    res.status(200).json(data);
  } catch (error) {
    console.error('API request error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};