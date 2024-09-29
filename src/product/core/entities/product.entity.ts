import { ValidationError } from '@shared/infra/ValidationError';
import { ProductPrice } from './product-price.entity';
import { ProductQuantity } from './product-quantity.entity';

export class Product {
  private id: string;
  private name: string;
  private description: string;
  private price: ProductPrice;
  private quantity: ProductQuantity;
  private supplierId: string;

  constructor(
    id: string,
    name: string,
    description: string,
    price: number,
    quantity: number,
    supplierId: string,
  ) {
    if (!name) throw new ValidationError('name must be provided');
    if (!description) throw new ValidationError('description must be provided');
    if (!supplierId) throw new ValidationError('supplierId must be provided');
    this.price = new ProductPrice(price);
    this.quantity = new ProductQuantity(quantity);
    this.id = id;
    this.name = name;
    this.description = description;
    this.supplierId = supplierId;
  }

  static create(
    name: string,
    description: string,
    price: number,
    quantity: number,
    supplierId: string,
  ) {
    return new Product(null, name, description, price, quantity, supplierId);
  }

  get Id(): string {
    return this.id;
  }

  get Name(): string {
    return this.name;
  }

  get Description(): string {
    return this.description;
  }

  get Price(): number {
    return this.price.getValue;
  }

  get Quantity(): number {
    return this.quantity.getValue;
  }

  get SupplierId(): string {
    return this.supplierId;
  }
}
