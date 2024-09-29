import { Injectable } from '@nestjs/common';
import { RepositoryInterface } from '@shared/interface/outbound/repository-interface';
import { Supplier } from '../domain/supplier';
import { useCaseInterface } from '@shared/interface/core/use-case-interface';

@Injectable()
export class DeleteSupplierUseCase implements useCaseInterface<Supplier, void> {
  constructor(
    readonly supplierRepository: RepositoryInterface<Supplier, Supplier>,
  ) {}
  async execute(supplier: Supplier): Promise<void> {
    return this.supplierRepository.delete(supplier);
  }
}
