import { FastifyInstance } from 'fastify';
import { createBet, getBets } from '../services/betsService';
import { Bet } from '../models/bet';
import { updateOdds } from '../services/oddsService';

/**
 * Registers betting-related routes on the Fastify app.
 *
 * @param app - The Fastify instance to register the routes on
 */
export async function betsRoutes(app: FastifyInstance) {
  /**
   * Create a new bet.
   * 
   * Endpoint: POST /bets  
   * Request body: { type: string, status: 'open' | 'closed', odds: number }  
   * Response: 201 Created with the created Bet object
   */
  app.post<{
    Body: Omit<Bet, 'id'>;
  }>('/bets', async (req, reply) => {
    const bet = createBet(req.body);
    reply.code(201).send(bet);
  });

  /**
   * Retrieve all bets with optional filters.
   * 
   * Endpoint: GET /bets  
   * Query params: ?type=string&status=open|closed  
   * Response: 200 OK with array of matching Bet objects
   */
  app.get('/bets', async (req, reply) => {
    const { type, status } = req.query as { type?: string; status?: string };
    const filtered = getBets({ type, status: status as 'open' | 'closed' });
    reply.send(filtered);
  });

  /**
   * Update the odds of an existing bet.
   * 
   * Endpoint: PUT /bets/:id/odds  
   * Request params: { id: string }  
   * Request body: { odds: number }  
   * Response: 200 OK with the updated Bet object
   */
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
