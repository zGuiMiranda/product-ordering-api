import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductUseCase } from '../core/use-cases/create-product-use-case';

@Controller('product')
export class ProductController {
  constructor(private createProductUseCase: CreateProductUseCase) {}

  @Post('create-product')
  create(@Body() createProductDto: CreateProductDto) {
    console.log(createProductDto);
    throw new Error('createProductDto');
    //return this.productService.create(createProductDto);
  }

  @Get()
  findAll() {
    //return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    //  return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    //  return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // return this.productService.remove(+id);
  }
}
