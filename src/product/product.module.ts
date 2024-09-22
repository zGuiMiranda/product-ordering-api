import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RepositoryInterface } from '@shared/interface/outbound/repository-interface';
import { SharedModule } from '../../src/shared/shared.module';
import { Product } from './core/entities/product.entity';
import { CreateProductUseCase } from './core/use-cases/create-product-use-case';
import { ProductController } from './inbound/product.controller';
import { ProductMongooseRepository } from './outbound/repository/product-mongoose-repository';
import ProductSchema, {
  Product as ProductModel,
} from './outbound/schema/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductModel.name, schema: ProductSchema },
    ]),

    SharedModule,
  ],
  controllers: [ProductController],
  providers: [
    CreateProductUseCase,
    ProductMongooseRepository,
    {
      provide: CreateProductUseCase,
      useFactory: (repo: RepositoryInterface<Product>) => {
        return new CreateProductUseCase(repo);
      },

      inject: [ProductMongooseRepository],
    },
  ],
})
export class ProductModule {}
