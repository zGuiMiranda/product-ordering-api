import { ValidationError } from '@shared/infra/ValidationError';

export class ProductQuantity {
  private quantity: number;

  constructor(quantity: number) {
    if (quantity < 0 || !quantity)
      throw new ValidationError('Invalid quantity');
    this.quantity = quantity;
  }

  get getValue() {
    return this.quantity;
  }
}
