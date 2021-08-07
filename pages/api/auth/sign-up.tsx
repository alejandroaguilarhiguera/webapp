import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse): void {
  return res.status(201).json({
    token: 'basdfasd',
    refreshToken: '',
    firebaseToken: '',
    accessTokenExpiresIn: '',
    refreshTokenExpiresIn: '',
    user: {
      _id: 'xxxxxxxx',
      email: 'test@gmail.com',
      displayName: 'test',
    },
  });
}
