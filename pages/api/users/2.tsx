import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse): void {
  res.status(200).json({
    _id: 2,
    email: 'otro@gmail.com',
  });
}
