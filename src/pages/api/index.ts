// pages/api/status.ts

import { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  message: string;
};

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  const responseData: ResponseData = {
    message: 'API running...',
  };

  res.status(200).json(responseData);
}
