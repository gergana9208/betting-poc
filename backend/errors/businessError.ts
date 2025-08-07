import { AppError } from './appError';
import { ErrorCodeKey } from './errorCodes';

export class BusinessError extends AppError {
  constructor(codeKey: ErrorCodeKey, statusCode = 400) {
    super(codeKey, statusCode, 'Business Error');
  }
}
