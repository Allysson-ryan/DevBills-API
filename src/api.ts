import { VercelRequest, VercelResponse } from '@vercel/node';
import app from './server';

export default function handler(req: VercelRequest, res: VercelResponse) {
  app(req, res); // Express trata as rotas
}
