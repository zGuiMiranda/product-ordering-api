import { IsOptional, IsString } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { AbstractSupplierDTO } from './abstract-supplier-dto';

export class DeleteSupplierDTO extends AbstractSupplierDTO {
  @IsOptional()
  @IsString({
    always: true,
    message: i18nValidationMessage('validations.general.stringField'),
  })
  name: string;
  @IsOptional()
  @IsString({
    always: true,
    message: i18nValidationMessage('validations.general.stringField'),
  })
  _id: string;
}
