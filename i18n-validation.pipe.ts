import {
  Injectable,
  BadRequestException,
  ValidationPipe,
  ValidationError,
  ValidationPipeOptions,
} from '@nestjs/common';
import { I18nContext, I18nService } from 'nestjs-i18n';
@Injectable()
export class I18nValidationPipe extends ValidationPipe {
  constructor(
    private readonly i18n: I18nService,
    options: ValidationPipeOptions,
  ) {
    super({
      ...options,
      exceptionFactory: (errors: ValidationError[]) => {
        const messages = errors.map((error) => ({
          field: error.property,
          message: this.formatErrorMessages(error.constraints, error.property),
        }));
        return new BadRequestException(messages);
      },
    });
  }

  private formatErrorMessages(
    constraints: { [type: string]: string },
    property: string,
  ): string {
    return Object.values(constraints)
      .map((constraint) => this.translateConstraint(constraint, property))
      .join('. ');
  }

  private translateConstraint(constraint: string, property: string): string {
    const pattern = /property .* should not exist/;
    const { lang } = I18nContext.current();

    if (pattern.test(constraint)) {
      return this.i18n.translate('validations.general.propertyShouldNotExist', {
        args: { property },
        lang,
      });
    }

    return this.translateNonPropertyMessages(constraint.split('|')[0], lang);
  }

  private translateNonPropertyMessages(
    translationKey: string,
    lang: string,
    arg?: string,
  ): string {
    return this.i18n.translate(translationKey, {
      args: { arg },
      lang,
    });
  }
}
