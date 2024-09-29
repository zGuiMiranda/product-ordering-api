import { Injectable } from '@nestjs/common';
import { RepositoryInterface } from '@shared/interface/outbound/repository-interface';
import { Supplier } from '../domain/supplier';
import { useCaseInterface } from '@shared/interface/core/use-case-interface';

@Injectable()
export class UpdateSupplierUseCase
  implements useCaseInterface<Supplier, Supplier>
{
  constructor(
    readonly supplierRepository: RepositoryInterface<Supplier, Supplier>,
  ) {}
  async execute(data: Supplier): Promise<Supplier> {
    console.log('vv');
    return this.supplierRepository.update(data);
  }
}
