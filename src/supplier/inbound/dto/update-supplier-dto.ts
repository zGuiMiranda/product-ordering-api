import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  isUUID,
} from 'class-validator';
import { AbstractSupplierDTO } from './abstract-supplier-dto';
import { Expose } from 'class-transformer';
import { i18nValidationMessage } from 'nestjs-i18n';

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
  _id: string;
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
