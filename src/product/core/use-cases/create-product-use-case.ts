import { Injectable } from '@nestjs/common';
import { RepositoryInterface } from '@shared/interface/outbound/repository-interface';
import { useCaseInterface } from '@shared/interface/core/use-case-interface';
import { Product } from '../entities/product.entity';
import { ValidationError } from 'class-validator';

export type InputCreateProduct = {
  name: string;
  unitPrice: number;
  description: string;
  quantity: number;
  supplierId: string;
};

@Injectable()
export class CreateProductUseCase
  implements useCaseInterface<Product, Product>
{
  constructor(readonly productRepository: RepositoryInterface<Product>) {}

  async execute(data: InputCreateProduct): Promise<Product> {
    if (!data.name) throw new Error('as');
    return this.productRepository.save(data);
  }
}
