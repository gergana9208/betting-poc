/**
 * Represents a sports bet with its core attributes.
 */
export interface Bet {
  /**
   * Unique identifier for the bet
   * @type {string}
   * */
  id: string;
  /**
   * Type of the bet (e.g., 'football', 'basketball')
   * @type {string}
   * */
  type: string;
  /**
   * Status of the bet: 'open' or 'closed'
   * @type {'open' | 'closed'}
   * */
  status: 'open' | 'closed';
  /**
   * // Odds associated with the bet, must be a number greater than 0
   * @type {number}
   * */
  odds: number;
}

/**
 * In-memory storage for all bets, keyed by bet ID.
 */
export type BetsStore = Map<string, Bet>;
