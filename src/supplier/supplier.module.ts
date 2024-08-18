import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import SupplierSchema, { Supplier } from './outbound/schemas/supplier-schema';
import { SupplierController } from './inbound/supplier.controller';
import { CreateSupplierUseCase } from './core/use-case/create-supplier-use-case';
import { SupplierRepository } from './outbound/repository/supplier-repository';
import { RepositoryInterface } from '@shared/interface/outbound/repository-interface';
import { Supplier as SupplierDomain } from './core/domain/supplier';
import { GetAllSuppliersUseCase } from './core/use-case/get-all-suppliers-use-case';
import { SharedModule } from '@shared/shared.module';
import { UpdateSupplierUseCase } from './core/use-case/update-supplier-use-case';
import { DeleteSupplierUseCase } from './core/use-case/delete-supplier-use-case';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Supplier.name, schema: SupplierSchema },
    ]),
    SharedModule,
  ],

  controllers: [SupplierController],
  providers: [
    CreateSupplierUseCase,
    GetAllSuppliersUseCase,
    UpdateSupplierUseCase,
    SupplierRepository,
    {
      provide: CreateSupplierUseCase,
      useFactory: (repo: RepositoryInterface<SupplierDomain>) => {
        return new CreateSupplierUseCase(repo);
      },

      inject: [SupplierRepository],
    },
    {
      provide: GetAllSuppliersUseCase,
      useFactory: (repo: RepositoryInterface<SupplierDomain>) => {
        return new GetAllSuppliersUseCase(repo);
      },

      inject: [SupplierRepository],
    },
    {
      provide: UpdateSupplierUseCase,
      useFactory: (repo: RepositoryInterface<SupplierDomain>) => {
        return new UpdateSupplierUseCase(repo);
      },

      inject: [SupplierRepository],
    },
    {
      provide: DeleteSupplierUseCase,
      useFactory: (repo: RepositoryInterface<SupplierDomain>) => {
        return new DeleteSupplierUseCase(repo);
      },

      inject: [SupplierRepository],
    },
  ],
})
export class SupplierModule {}
