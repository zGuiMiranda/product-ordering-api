import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { RedisModule } from 'src/redis/redis.module';
import { Product } from './core/entities/product.entity';
import { CreateProductUseCase } from './core/use-cases/create-product-use-case';
import { ProductController } from './inbound/product.controller';
import { ProductMongooseRepository } from './outbound/repository/product-mongoose-repository';
import ProductSchema, {
  Product as ProductModel,
} from './outbound/schema/product.schema';
import { AllExceptionsFilter } from '@shared/exception-filter/all-exceptions-filter ';
import { RepositoryInterface } from '@shared/interface/outbound/repository-interface';
import { SharedModule } from '@shared/shared.module';
import { ValidationError } from '@shared/infra/ValidationError';
import { RedisCacheRepositoryInterface } from '@shared/interface/outbound/redis-cache-repository-interface';
import { RedisCacheRepository } from 'src/redis/outbound/redis-cache-repository';
import { GetProductsUseCase } from './core/use-cases/get-products-use-case';
import { faker } from '@faker-js/faker/.';
const ENV = `.env.${process.env.NODE_ENV || 'development'}`;

jest.setTimeout(10000);

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
        GetProductsUseCase,
        ProductMongooseRepository,
        {
          provide: CreateProductUseCase,
          useFactory: (repo: RepositoryInterface<Product, Product>) => {
            return new CreateProductUseCase(repo);
          },

          inject: [ProductMongooseRepository, RedisCacheRepository],
        },
        {
          provide: GetProductsUseCase,
          useFactory: (
            cacheRepo: RedisCacheRepositoryInterface<Product[], string>,
            repo: RepositoryInterface<Product, void>,
          ) => {
            return new GetProductsUseCase(cacheRepo, repo);
          },

          inject: [RedisCacheRepository, ProductMongooseRepository],
        },
        {
          provide: APP_FILTER,
          useClass: AllExceptionsFilter,
        },
      ],
    }).compile();

    productController = app.get<ProductController>(ProductController);
  });

  test('should not create a product without a name', async () => {
    const input = {
      name: '',
      description: 'Hello World!',
      quantity: 1,
      price: -41,
      supplierId: 's',
    };
    expect(() =>
      Product.create(
        input.name,
        input.description,
        input.price,
        input.quantity,
        input.supplierId,
      ),
    ).toThrow(new ValidationError('name must be provided'));
  });

  test('should not create a product without description', async () => {
    const input = {
      name: 'aaa',
      description: '',
      quantity: 1,
      price: -41,
      supplierId: 's',
    };
    expect(() =>
      Product.create(
        input.name,
        input.description,
        input.price,
        input.quantity,
        input.supplierId,
      ),
    ).toThrow(new ValidationError('description must be provided'));
  });

  test('should not create a product with invalid quantity', async () => {
    const input = {
      name: 'aaa',
      description: 'sasasa',
      quantity: -1,
      price: 41,
      supplierId: 's',
    };
    expect(() =>
      Product.create(
        input.name,
        input.description,
        input.price,
        input.quantity,
        input.supplierId,
      ),
    ).toThrow(new ValidationError('Invalid quantity'));
  });

  test('should not create a product with invalid price', async () => {
    const input = {
      name: 'aaa',
      description: 'de',
      quantity: 1,
      price: -41,
      supplierId: 's',
    };
    expect(() =>
      Product.create(
        input.name,
        input.description,
        input.price,
        input.quantity,
        input.supplierId,
      ),
    ).toThrow(new ValidationError('Invalid price'));
  });

  test('should not create a product without supplierId', async () => {
    const input = {
      name: 'aaa',
      description: 'de',
      quantity: 1,
      price: -41,
      supplierId: null,
    };
    expect(() =>
      Product.create(
        input.name,
        input.description,
        input.price,
        input.quantity,
        input.supplierId,
      ),
    ).toThrow(new ValidationError('supplierId must be provided'));
  });

  test('should  create a product', async () => {
    const input = {
      name: 'aaa',
      description: 'de',
      quantity: 1,
      price: 41,
      supplierId: 'null',
    };

    const output = await productController.create(input);
    expect(output.name).toBeDefined();
    expect(output.name).toBe(input.name);

    expect(output.id).toBeDefined();

    expect(output.price).toBeDefined();
    expect(output.price).toBe(input.price);

    expect(output.quantity).toBeDefined();
    expect(output.quantity).toBe(input.quantity);
  });

  test('should  create products and get them', async () => {
    const fullName = faker.person.fullName();
    const mongooseGetAllSpy = jest.spyOn(
      ProductMongooseRepository.prototype,
      'getAll',
    );
    const cacheGetSpy = jest.spyOn(RedisCacheRepository.prototype, 'get');
    const cacheSaveSpy = jest.spyOn(RedisCacheRepository.prototype, 'save');

    const input = {
      name: fullName,
      description: 'de',
      quantity: 1,
      price: 41,
      supplierId: 'null',
    };

    const output = await productController.create(input);

    expect(output.name).toBeDefined();
    expect(output.name).toBe(input.name);
    expect(output.id).toBeDefined();
    expect(output.price).toBeDefined();
    expect(output.price).toBe(input.price);
    expect(output.quantity).toBeDefined();
    expect(output.quantity).toBe(input.quantity);

    await productController.findAll();

    const ttlSeconds = process.env.REDIS_TTL_SECONDS
      ? +process.env.REDIS_TTL_SECONDS
      : 10000;

    await new Promise((resolve) => setTimeout(resolve, ttlSeconds));

    const outputGetAllProducts = await productController.findAll();

    expect(outputGetAllProducts.length).toBeGreaterThan(0);

    expect(mongooseGetAllSpy).toHaveBeenCalledTimes(1);
    expect(cacheSaveSpy).toHaveBeenCalledTimes(1);
    expect(cacheGetSpy).toHaveBeenCalledTimes(2);

    expect(
      outputGetAllProducts[outputGetAllProducts.length - 1],
    ).toHaveProperty('name', fullName);
  });
});
