import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
  token?: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    if (username === 'admin' && password === 'password') {
      res
        .status(200)
        .json({ message: 'Login successful', token: 'fake-jwt-token' });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
