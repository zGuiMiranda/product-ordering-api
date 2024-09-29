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
import { RedisCacheRepositoryInterface } from '@shared/interface/outbound/redis-cache-repository-interface';
import { RedisCacheRepository } from 'src/redis/outbound/redis-cache-repository';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductModel.name, schema: ProductSchema },
    ]),
    RedisModule,
    SharedModule,
  ],
  controllers: [ProductController],
  providers: [
    CreateProductUseCase,
    ProductMongooseRepository,
    {
      provide: CreateProductUseCase,
      useFactory: (
        repo: RepositoryInterface<Product>,
        cacheRepo: RedisCacheRepositoryInterface<Product>,
      ) => {
        return new CreateProductUseCase(repo, cacheRepo);
      },

      inject: [ProductMongooseRepository, RedisCacheRepository],
    },
  ],
})
export class ProductModule {}
