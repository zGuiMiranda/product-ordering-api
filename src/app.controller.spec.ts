import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { I18nConfig } from './i18n.config';
const ENV = `.env.${process.env.NODE_ENV || 'development'}`;

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: ENV,
          isGlobal: true,
        }),
        MongooseModule.forRoot(
          `mongodb://${process.env.MONGO_ADDRESS}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}`,
        ),
        I18nConfig,
      ],

      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
