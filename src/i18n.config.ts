import {
  CookieResolver,
  HeaderResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { CustomQueryResolver } from 'custom-resolver-i18n';

export const I18nConfig = I18nModule.forRootAsync({
  useFactory: () => ({
    fallbackLanguage: process.env.DEFAULT_LANGUAGE,
    fallbacks: {
      'en-*': 'en-us',
      'pt-*': 'pt-br',
    },
    loaderOptions: {
      path: join(__dirname, '../locales/'),
      watch: true,
    },
  }),
  resolvers: [new CustomQueryResolver()],
  inject: [ConfigService],
});
