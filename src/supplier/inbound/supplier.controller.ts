import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Supplier } from '../core/domain/supplier';
import { CreateSupplierDTO } from './dto/create-supplier-dto';
import { CreateSupplierUseCase } from '../core/use-case/create-supplier-use-case';
import { Response } from 'express';
import { GetAllSuppliersUseCase } from '../core/use-case/get-all-suppliers-use-case';
import { FindSupplierDTO } from './dto/find-supplier-dto';
import { UpdateSupplierDTO } from './dto/update-supplier-dto';
import { UpdateSupplierUseCase } from '../core/use-case/update-supplier-use-case';
import { DeleteSupplierDTO } from './dto/delete-supplier-dto';
import { DeleteSupplierUseCase } from '../core/use-case/delete-supplier-use-case';

@Controller('supplier')
export class SupplierController {
  constructor(
    private readonly createSupplierUseCase: CreateSupplierUseCase,
    private readonly getAllSuppliersUseCase: GetAllSuppliersUseCase,
    private readonly updateSupplierUseCase: UpdateSupplierUseCase,
    private readonly deleteSupplierUseCase: DeleteSupplierUseCase,
  ) {}

  @Post('create-supplier')
  async createSupplier(
    @Body() createSupplierDTO: CreateSupplierDTO,
    @Res() res: Response,
  ) {
    const supplier = plainToClass(Supplier, createSupplierDTO);
    const response = await this.createSupplierUseCase.execute(supplier);
    return res.status(HttpStatus.CREATED).send(response);
  }

  @Get('get-suppliers')
  async getAllSuppliers(
    @Body() findSupplierDTO: FindSupplierDTO,
    @Res() res: Response,
  ) {
    const supplier = plainToClass(Supplier, findSupplierDTO);
    const response = await this.getAllSuppliersUseCase.execute(supplier);
    return res.status(HttpStatus.CREATED).send(response);
  }

  @Put('update-supplier')
  async updateSupplier(
    @Body() updateSupplierDTO: UpdateSupplierDTO,
    @Res() res: Response,
  ) {
    const supplier = plainToClass(Supplier, updateSupplierDTO);
    const response = await this.updateSupplierUseCase.execute(supplier);
    return res.status(HttpStatus.CREATED).send(response);
  }

  @Delete('delete-supplier')
  async deleteSupplier(
    @Body() deleteSupplierDTO: DeleteSupplierDTO,
    @Res() res: Response,
  ) {
    const supplier = plainToClass(Supplier, deleteSupplierDTO);
    const response = await this.deleteSupplierUseCase.execute(supplier);
    return res.status(HttpStatus.CREATED).send(response);
  }
}
