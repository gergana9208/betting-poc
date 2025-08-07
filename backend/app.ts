import Fastify from 'fastify';
import cors from '@fastify/cors';
import { betsRoutes } from './routes/betsRoute';
import { errorHandler } from './errors/errorHandler';

export async function buildApp() {
  const app = Fastify({ logger: true });

  await app.register(cors);
  await app.register(betsRoutes);

  errorHandler(app);

  return app;
}
