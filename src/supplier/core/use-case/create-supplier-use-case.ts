import { Injectable } from '@nestjs/common';
import { RepositoryInterface } from '@shared/interface/outbound/repository-interface';
import { Supplier } from '../domain/supplier';
import { useCaseInterface } from '@shared/interface/core/use-case-interface';

@Injectable()
export class CreateSupplierUseCase
  implements useCaseInterface<Supplier, Supplier>
{
  constructor(
    readonly supplierRepository: RepositoryInterface<Supplier, Supplier>,
  ) {}
  async execute(data: Supplier): Promise<Supplier> {
    return this.supplierRepository.save(data);
  }
}
