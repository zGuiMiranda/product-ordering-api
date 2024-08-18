import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class AbstractSupplierDTO {
  @Expose()
  @IsString({
    always: true,
    message: i18nValidationMessage('validations.general.stringField'),
  })
  @IsNotEmpty({
    always: true,
    message: i18nValidationMessage('validations.general.mandatoryField'),
  })
  name: string;
}
