import { describe, it, expect } from 'vitest';
import { createBet, getBets } from '../services/betsService';
import { TechnicalError } from '../errors/technicalError';
import { BusinessError } from '../errors/businessError';

describe('createBet', () => {
  it('creates a valid bet', () => {
    const bet = createBet({ type: 'football', status: 'open', odds: 2.5 });
    expect(bet).toHaveProperty('id');
    expect(bet.type).toBe('football');
    expect(bet.status).toBe('open');
    expect(bet.odds).toBe(2.5);
  });

  it('throws TechnicalError for missing type', () => {
    expect(() => createBet({ type: '', status: 'open', odds: 1.5 })).toThrowError(TechnicalError);
  });

  it('throws TechnicalError for invalid status', () => {
    expect(() => createBet({ type: 'football', status: 'invalid' as any, odds: 1.5 })).toThrowError(
      TechnicalError,
    );
  });

  it('throws TechnicalError for invalid odds', () => {
    expect(() => createBet({ type: 'football', status: 'open', odds: -5 })).toThrowError(
      TechnicalError,
    );
  });
});

describe('getBets', () => {
  it('returns bets filtered by type', () => {
    createBet({ type: 'basketball', status: 'open', odds: 3 });
    const filtered = getBets({ type: 'basketball' });
    expect(filtered.every((b) => b.type === 'basketball')).toBe(true);
  });

  it('returns bets filtered by status', () => {
    createBet({ type: 'tennis', status: 'closed', odds: 2 });
    const filtered = getBets({ status: 'closed' });
    expect(filtered.every((b) => b.status === 'closed')).toBe(true);
  });

  it('throws BusinessError for invalid type filter', () => {
    expect(() => getBets({ type: 123 as any })).toThrowError(BusinessError);
  });

  it('throws BusinessError for invalid status filter', () => {
    expect(() => getBets({ status: 'invalid' as any })).toThrowError(BusinessError);
  });
});
