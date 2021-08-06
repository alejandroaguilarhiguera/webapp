import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse): void {
  res.status(200).json({
    token: 'basdfasd',
    user: {
      id: 1,
      email: req.body.email,
    },
  });
}
