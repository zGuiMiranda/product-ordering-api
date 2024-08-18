import { Injectable, ExecutionContext } from '@nestjs/common';
import { I18nResolver } from 'nestjs-i18n';
import { Request } from 'express'; // Use o tipo apropriado se estiver usando Express

@Injectable()
export class CustomQueryResolver implements I18nResolver {
  resolve(context: ExecutionContext): string {
    const request = context.switchToHttp().getRequest<Request>();
    const locale = request.headers?.['locale'] as string;
    return locale;
  }
}
