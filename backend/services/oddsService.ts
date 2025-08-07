import { getBets } from './betsService';
import { Bet } from '../models/bet';
import { BusinessError } from '../errors/businessError';
import { emitter } from '../events/emitter';

/**
 * Updates the odds of a specific bet by ID and emits an 'odds-updated' event.
 * @param id - The ID of the bet to update.
 * @param odds - The new odds value (must be a number > 0).
 * @returns The updated Bet object.
 * @throws BusinessError if the odds are invalid or the bet is not found.
 */
export function updateOdds(id: string, odds: number): Bet {
  if (typeof odds !== 'number' || odds <= 0) {
    throw new BusinessError('BETTING_POC_4007', 400);
  }

  const all = getBets();
  const bet = all.find((b) => b.id === id);

  if (!bet) {
    throw new BusinessError('BETTING_POC_4004', 404);
  }

  const oldOdds = bet.odds;
  bet.odds = odds;

  emitter.emit('odds-updated', { id, oldOdds, newOdds: odds });

  return bet;
}
