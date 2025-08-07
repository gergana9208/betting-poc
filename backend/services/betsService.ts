import { Bet, BetsStore } from '../models/bet';
import { TechnicalError } from '../errors/technicalError';
import { BusinessError } from '../errors/businessError';

const bets: BetsStore = new Map();

/**
 * Creates a new bet, validates input fields, and stores it in memory.
 * @param data - Object containing 'type', 'status', and 'odds' (excluding 'id').
 * @returns The newly created Bet object.
 * @throws TechnicalError if any required fields are invalid or missing.
 */
export function createBet(data: Omit<Bet, 'id'>): Bet {
  const { type, status, odds } = data;

  if (!type || typeof type !== 'string') {
    throw new TechnicalError('BETTING_POC_4001', 400);
  }

  if (status !== 'open' && status !== 'closed') {
    throw new TechnicalError('BETTING_POC_4002', 400);
  }

  if (typeof odds !== 'number' || odds <= 0) {
    throw new TechnicalError('BETTING_POC_4003', 400);
  }

  const id = Date.now().toString();
  const bet: Bet = { ...data, id };

  bets.set(id, bet);
  return bet;
}

/**
 * Retrieves all bets from memory, which can also be filtered by type and/or status.
 * @param filter - Optional object with 'type' and/or 'status' to filter the results.
 * @returns Array of Bet objects matching the filter.
 * @throws BusinessError if the filter values are invalid.
 */
export function getBets(filter?: Partial<Pick<Bet, 'type' | 'status'>>): Bet[] {
  const { type, status } = filter || {};

  if (type && typeof type !== 'string') {
    throw new BusinessError('BETTING_POC_4005', 400);
  }

  if (status && status !== 'open' && status !== 'closed') {
    throw new BusinessError('BETTING_POC_4006', 400);
  }

  let all = Array.from(bets.values());

  if (type) {
    all = all.filter((bet) => bet.type === type);
  }

  if (status) {
    all = all.filter((bet) => bet.status === status);
  }

  return all;
}
