import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { I18nConfig } from './i18n.config';
import { SupplierModule } from './supplier/supplier.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from '@shared/exception-filter/all-exceptions-filter ';

const ENV = `.env.${process.env.MONGO_DATABASE || 'development'}`;
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ENV,
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      //process.env.MONGODB_URL,
       `mongodb://${process.env.MONGO_ADDRESS}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}`,
    ),
    I18nConfig,
    SupplierModule,
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
