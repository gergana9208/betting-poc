import { AppError } from './appError';
import { ErrorCodeKey } from './errorCodes';

export class TechnicalError extends AppError {
  constructor(codeKey: ErrorCodeKey, statusCode = 500) {
    super(codeKey, statusCode, 'Technical Error');
  }
}
