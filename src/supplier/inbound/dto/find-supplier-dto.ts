import { IsOptional, IsString } from 'class-validator';
import { AbstractSupplierDTO } from './abstract-supplier-dto';
import { i18nValidationMessage } from 'nestjs-i18n';

export class FindSupplierDTO extends AbstractSupplierDTO {
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
  id: string;
}
