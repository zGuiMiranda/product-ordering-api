import { Injectable } from '@nestjs/common/decorators/core';

import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Product } from 'src/product/core/entities/product.entity';
import {
  ProductDocument,
  Product as ProductModel,
} from '../schema/product.schema';
import { AbstractRepository } from '@shared/abstract/outbound/AbstractRepository';
import { RepositoryInterface } from '@shared/interface/outbound/repository-interface';
import { QueryBuilderService } from '@shared/query-builder-service/query-builder-service';

@Injectable()
export class ProductMongooseRepository
  extends AbstractRepository<
    Product | FilterQuery<ProductDocument>,
    ProductDocument
  >
  implements RepositoryInterface<Product, Product>
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
  async save(product: Product): Promise<Product> {
    return this.toObject(
      await super.create({
        ...product,
        price: product.Price,
        quantity: product.Quantity,
      }),
    );
  }
  update(domain: Product): Promise<Product> {
    throw new Error('Method not implemented.');
  }
  async getAll(product: Product): Promise<Product[]> {
    return (
      await super.findAll(this.queryBuilderService.buildQueryMongoose(product))
    ).map(this.toObject);
  }
  delete(domain: Product): Promise<void> {
    throw new Error('Method not implemented.');
  }
  toObject(product: ProductDocument): Product {
    const formattedProduct = product.toObject({
      transform: (_doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        return ret;
      },
    }) as unknown as {
      id: string;
      name: string;
      description: string;
      price: number;
      quantity: number;
      supplierId: string;
    };

    return new Product(
      formattedProduct.id.toString(),
      formattedProduct.name,
      formattedProduct.description,
      formattedProduct.price,
      formattedProduct.quantity,
      formattedProduct.supplierId.toString(),
    );
  }
}
