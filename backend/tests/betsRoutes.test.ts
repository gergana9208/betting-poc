import { describe, it, beforeEach, expect } from 'vitest';
import Fastify from 'fastify';
import { betsRoutes } from '../routes/betsRoute';

describe('Betting API Routes', () => {
  let app: any;

  beforeEach(async () => {
    app = Fastify();
    await app.register(betsRoutes);
  });

  it('should create a new bet', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/bets',
      payload: {
        type: 'football',
        status: 'open',
        odds: 2.5,
      },
    });

    expect(response.statusCode).toBe(201);
    const body = JSON.parse(response.body);
    expect(body).toHaveProperty('id');
    expect(body.type).toBe('football');
    expect(body.status).toBe('open');
    expect(body.odds).toBe(2.5);
  });

  it('should return all bets (unfiltered)', async () => {
    await app.inject({
      method: 'POST',
      url: '/bets',
      payload: {
        type: 'tennis',
        status: 'open',
        odds: 1.8,
      },
    });

    const response = await app.inject({
      method: 'GET',
      url: '/bets',
    });

    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.body);
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);
  });

  it('should update odds for an existing bet', async () => {
    const createResponse = await app.inject({
      method: 'POST',
      url: '/bets',
      payload: {
        type: 'basketball',
        status: 'closed',
        odds: 3.2,
      },
    });

    const createdBet = JSON.parse(createResponse.body);
    const betId = createdBet.id;

    const updateResponse = await app.inject({
      method: 'PUT',
      url: `/bets/${betId}/odds`,
      payload: {
        odds: 4.1,
      },
    });

    expect(updateResponse.statusCode).toBe(200);
    const updated = JSON.parse(updateResponse.body);
    expect(updated.id).toBe(betId);
    expect(updated.odds).toBe(4.1);
  });
});
