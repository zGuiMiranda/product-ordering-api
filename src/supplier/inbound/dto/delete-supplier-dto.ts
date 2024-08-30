import { IsNotEmpty, IsString } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class DeleteSupplierDTO {
  @IsString({
    always: true,
    message: i18nValidationMessage('validations.general.stringField'),
  })
  @IsNotEmpty({
    always: true,
    message: i18nValidationMessage('validations.general.mandatoryField'),
  })
  id: string;
}
