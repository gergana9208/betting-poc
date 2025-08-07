import { ErrorCodeKey, ErrorCodes } from './errorCodes';

export abstract class AppError extends Error {
  public readonly statusCode: number;
  public readonly internalCode: string;
  public readonly errorType: string;

  constructor(codeKey: ErrorCodeKey, statusCode: number, errorType: string) {
    super(ErrorCodes[codeKey]);
    this.name = new.target.name;
    this.statusCode = statusCode;
    this.internalCode = codeKey;
    this.errorType = errorType;
  }
}
