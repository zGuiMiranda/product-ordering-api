import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { I18nConfig } from './i18n.config';
import { SupplierModule } from './supplier/supplier.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from '@shared/exception-filter/all-exceptions-filter ';
import { ProductModule } from './product/product.module';
import { RedisModule } from './redis/redis.module';

const ENV = `.env.${process.env.NODE_ENV || 'development'}`;
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ENV,
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      //docker local abaixo
      //  process.env.MONGODB_URL,
      //atlas abaixo
      //  `mongodb+srv://${process.env.MONGO_ATLAS_USER}:${process.env.MONGO_ATLAS_PASSWORD}@${process.env.MONGO_APP_NAME_ATLAS}.yn1vf.mongodb.net/?retryWrites=true&w=majority&appName=${process.env.MONGO_APP_NAME_ATLAS}`
      //mongo local abaixo
      `mongodb://${process.env.MONGO_ADDRESS}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}`,
    ),
    I18nConfig,
    SupplierModule,
    ProductModule,
    RedisModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
