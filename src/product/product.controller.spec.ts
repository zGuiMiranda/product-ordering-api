import { Test, TestingModule } from '@nestjs/testing';
import { RepositoryInterface } from '../../src/shared/interface/outbound/repository-interface';
import { SharedModule } from '../../src/shared/shared.module';
import { CreateProductUseCase } from './core/use-cases/create-product-use-case';
import { ProductController } from './inbound/product.controller';
import { ProductMongooseRepository } from './outbound/repository/product-mongoose-repository';
import ProductSchema, {
  Product as ProductModel,
} from './outbound/schema/product.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisConfigService } from 'src/redis/redis.config.service';
import { RedisModule } from 'src/redis/redis.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from '../shared/exception-filter/all-exceptions-filter ';
const ENV = `.env.${process.env.NODE_ENV || 'development'}`;

describe('ProductController', () => {
  let productController: ProductController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: ENV,
          isGlobal: true,
        }),

        MongooseModule.forRootAsync({
          useFactory: async (configService: ConfigService) => ({
            uri: `mongodb://${configService.get<string>('MONGO_ADDRESS')}:${configService.get<string>('MONGO_PORT')}/${configService.get<string>('MONGO_DATABASE')}`,
          }),
          imports: [ConfigModule],
          inject: [ConfigService],
        }),
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
          useFactory: (repo: RepositoryInterface<ProductModel>) => {
            return new CreateProductUseCase(repo);
          },

          inject: [ProductMongooseRepository],
        },
        {
          provide: APP_FILTER,
          useClass: AllExceptionsFilter,
        },
      ],
    }).compile();

    productController = app.get<ProductController>(ProductController);
  });

  describe('product controller', () => {
    it('should return "Hello World!"', () => {
      const input = {
        name: '',
        description: 'Hello World!',
        quantity: 1,
        unitPrice: -41,
        supplierId: 's',
      };
      productController.create(input);
      expect(productController.create(input)).toBe('Hello World!');
    });
  });
});
