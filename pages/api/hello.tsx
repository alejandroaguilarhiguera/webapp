import type { NextApiRequest, NextApiResponse } from 'next';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req: NextApiRequest, res: NextApiResponse): void {
  res.status(200).json({ name: 'John Doe' });
}
