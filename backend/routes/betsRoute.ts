import { FastifyInstance } from 'fastify';
import { createBet, getBets } from '../services/betsService';
import { Bet } from '../models/bet';
import { updateOdds } from '../services/oddsService';

export async function betsRoutes(app: FastifyInstance) {
  app.post<{
    Body: Omit<Bet, 'id'>;
  }>('/bets', async (req, reply) => {
    const bet = createBet(req.body);
    reply.code(201).send(bet);
  });

  app.get('/bets', async (req, reply) => {
    const { type, status } = req.query as { type?: string; status?: string };
    const filtered = getBets({ type, status: status as 'open' | 'closed' });
    reply.send(filtered);
  });

  app.put<{
    Params: { id: string };
    Body: { odds: number };
  }>('/bets/:id/odds', async (req, reply) => {
    const { id } = req.params;
    const { odds } = req.body;

    const updatedBet = updateOdds(id, odds);
    reply.send(updatedBet);
  });
}
