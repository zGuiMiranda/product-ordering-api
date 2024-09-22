import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { AbstractSupplierDTO } from './abstract-supplier-dto';

export class UpdateSupplierDTO extends AbstractSupplierDTO {
  @Expose()
  @IsString({
    always: true,
    message: i18nValidationMessage('validations.general.stringField'),
  })
  @IsNotEmpty({
    always: true,
    message: i18nValidationMessage('validations.general.mandatoryField'),
  })
  id: string;
  @IsNotEmpty({
    always: true,
    message: i18nValidationMessage('validations.general.mandatoryField'),
  })
  @IsString({
    always: true,
    message: i18nValidationMessage('validations.general.stringField'),
  })
  name: string;
}
