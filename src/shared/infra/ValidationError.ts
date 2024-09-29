export class ValidationError implements Error {
  name: string;
  message: string;
  stack?: string;
  code?: number;

  constructor(message: string) {
    this.name = 'ValidationError';
    this.message = message;
    this.stack = new Error().stack;
    this.code = 400;
  }
}
