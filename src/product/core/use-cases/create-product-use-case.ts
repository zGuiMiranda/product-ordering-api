import { Injectable } from '@nestjs/common';
import { RepositoryInterface } from '@shared/interface/outbound/repository-interface';
import { useCaseInterface } from '@shared/interface/core/use-case-interface';
import { Product } from '../entities/product.entity';
import { RedisCacheRepositoryInterface } from '@shared/interface/outbound/redis-cache-repository-interface';

export type InputCreateProduct = {
  name: string;
  price: number;
  description: string;
  quantity: number;
  supplierId: string;
};

@Injectable()
export class CreateProductUseCase
  implements useCaseInterface<InputCreateProduct, Output>
{
  constructor(
    readonly productRepository: RepositoryInterface<Product, Product>,
  ) {}

  async execute(data: InputCreateProduct): Promise<Output> {
    const product = Product.create(
      data.name,
      data.description,
      data.price,
      data.quantity,
      data.supplierId,
    );

    const productResponse = await this.productRepository.save(product);
    return {
      id: productResponse.Id,
      name: productResponse.Name,
      description: productResponse.Description,
      price: productResponse.Price,
      quantity: productResponse.Quantity,
      supplierId: productResponse.SupplierId,
    };
  }
}

type Output = {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  supplierId: string;
};
