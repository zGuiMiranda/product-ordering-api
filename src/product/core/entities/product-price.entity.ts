import { ValidationError } from '@shared/infra/ValidationError';

export class ProductPrice {
  private price: number;

  constructor(price: number) {
    if (!price || price < 0) throw new ValidationError('Invalid price');
    this.price = price;
  }

  get getValue() {
    return this.price;
  }
}
