import { QueryBuilderService } from '../../../shared/query-builder-service/query-builder-service';
import { Injectable } from '@nestjs/common/decorators/core';
import { AbstractRepository } from '../../../shared/abstract/outbound/AbstractRepository';

import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { RepositoryInterface } from '../../../shared/interface/outbound/repository-interface';
import { Product } from 'src/product/core/entities/product.entity';
import {
  ProductDocument,
  Product as ProductModel,
} from '../schema/product.schema';

@Injectable()
export class ProductMongooseRepository
  extends AbstractRepository<
    Product | FilterQuery<ProductDocument>,
    ProductDocument
  >
  implements RepositoryInterface<Product>
{
  constructor(
    @InjectModel(ProductModel.name) readonly model: Model<ProductDocument>,
    private readonly queryBuilderService: QueryBuilderService<
      Product,
      ProductDocument
    >,
  ) {
    super(model);
  }
  save(domain: Product): Promise<Product> {
    throw new Error('Method not implemented.');
  }
  update(domain: Product): Promise<Product> {
    throw new Error('Method not implemented.');
  }
  getAll(domain: Product): Promise<Product[]> {
    throw new Error('Method not implemented.');
  }
  delete(domain: Product): Promise<void> {
    throw new Error('Method not implemented.');
  }
  toObject(supplier: ProductDocument): Product {
    return supplier.toObject({
      transform: (_doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        return ret;
      },
    }) as unknown as Product;
  }
}
