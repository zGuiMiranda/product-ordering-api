import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString({
    always: true,
    message: i18nValidationMessage('validations.general.stringField'),
  })
  name: string;
  @IsNotEmpty()
  @IsString({
    always: true,
    message: i18nValidationMessage('validations.general.stringField'),
  })
  description: string;

  @IsNotEmpty()
  @IsString({
    always: true,
    message: i18nValidationMessage('validations.general.stringField'),
  })
  supplierId: string;

  @IsNotEmpty()
  @Min(1)
  @IsNumber()
  unitPrice: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  quantity: number;
}
