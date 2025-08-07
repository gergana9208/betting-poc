import { EventEmitter } from 'events';
import { ErrorCodes } from '../errors/errorCodes';

export const emitter = new EventEmitter();

emitter.on('odds-updated', (data) => {
  try {
    const { id, oldOdds, newOdds } = data || {};

    if (!id || typeof oldOdds !== 'number' || typeof newOdds !== 'number') {
      throw new Error(ErrorCodes.BETTING_POC_5001);
    }

    console.log(`Odds updated for Bet ID ${id}: ${oldOdds} → ${newOdds}`);
  } catch (err) {
    if (err instanceof Error) {
      console.error('⚠️ Event error [odds-updated]:', err.message);
    } else {
      console.error('⚠️ Event error [odds-updated]:', err);
    }
  }
});
