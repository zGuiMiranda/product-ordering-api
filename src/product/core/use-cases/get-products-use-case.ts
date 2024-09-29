import { Injectable } from '@nestjs/common';
import { useCaseInterface } from '@shared/interface/core/use-case-interface';
import { Product } from '../entities/product.entity';
import { RedisCacheRepositoryInterface } from '@shared/interface/outbound/redis-cache-repository-interface';
import { RepositoryInterface } from '@shared/interface/outbound/repository-interface';

@Injectable()
export class GetProductsUseCase implements useCaseInterface<void, Output[]> {
  constructor(
    readonly redisCacheRepository: RedisCacheRepositoryInterface<
      Product[],
      string
    >,
    readonly productRepository: RepositoryInterface<Product, void>,
  ) {}

  async execute(): Promise<Output[]> {
    const productsInCache = await this.redisCacheRepository.get('products');

    if (productsInCache) return JSON.parse(productsInCache) as Output[];

    const productsMongo = await this.productRepository.getAll();

    await this.redisCacheRepository.save('products', productsMongo);

    return productsMongo.map((product) => ({
      id: product.Id,
      name: product.Name,
      description: product.Description,
      price: product.Price,
      quantity: product.Quantity,
      supplierId: product.SupplierId,
    }));
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
