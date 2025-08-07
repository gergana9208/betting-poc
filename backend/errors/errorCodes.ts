export const ErrorCodes = {
  BETTING_POC_4001: 'Invalid or missing "type"',
  BETTING_POC_4002: 'Invalid or missing "status"',
  BETTING_POC_4003: 'Invalid or missing "odds"',
  BETTING_POC_4004: 'Bet not found',
  BETTING_POC_4005: 'Invalid "type" filter. Must be a string.',
  BETTING_POC_4006: 'Invalid "status" filter. Must be "open" or "closed".',
  BETTING_POC_4007: 'Invalid "odds". Must be a number > 0',
  BETTING_POC_5001: 'Invalid payload for "odds-updated" event',
};

export type ErrorCodeKey = keyof typeof ErrorCodes;
