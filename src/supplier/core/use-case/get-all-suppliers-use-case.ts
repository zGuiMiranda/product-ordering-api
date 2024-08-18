import { Injectable } from '@nestjs/common';
import { RepositoryInterface } from '@shared/interface/outbound/repository-interface';
import { Supplier } from '../domain/supplier';
import { useCaseInterface } from '@shared/interface/core/use-case-interface';

@Injectable()
export class GetAllSuppliersUseCase
  implements useCaseInterface<Supplier, Supplier[]>
{
  constructor(readonly supplierRepository: RepositoryInterface<Supplier>) {}
  async execute(supplier: Supplier): Promise<Supplier[]> {
    return this.supplierRepository.getAll(supplier);
  }
}
