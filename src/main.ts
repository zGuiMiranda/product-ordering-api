import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { I18nService } from 'nestjs-i18n';
import { I18nValidationPipe } from 'i18n-validation.pipe';
import { AllExceptionsFilter } from '@shared/exception-filter/all-exceptions-filter ';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const allowedOrigins = process.env.ORIGINS ? process.env.ORIGINS.split(',') : [];

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  });


  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(
    new I18nValidationPipe(app.get(I18nService), {
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  );
  await app.listen(process.env.PORT);
}
bootstrap();
