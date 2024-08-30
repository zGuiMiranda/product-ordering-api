import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import SupplierSchema, { Supplier } from './outbound/schemas/supplier-schema';
import { SupplierController } from './inbound/supplier.controller';
import { CreateSupplierUseCase } from './core/use-case/create-supplier-use-case';
import { SupplierMongooseRepository } from './outbound/repository/supplier-mongoose-repository';
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
    SupplierMongooseRepository,
    {
      provide: CreateSupplierUseCase,
      useFactory: (repo: RepositoryInterface<SupplierDomain>) => {
        return new CreateSupplierUseCase(repo);
      },

      inject: [SupplierMongooseRepository],
    },
    {
      provide: GetAllSuppliersUseCase,
      useFactory: (repo: RepositoryInterface<SupplierDomain>) => {
        return new GetAllSuppliersUseCase(repo);
      },

      inject: [SupplierMongooseRepository],
    },
    {
      provide: UpdateSupplierUseCase,
      useFactory: (repo: RepositoryInterface<SupplierDomain>) => {
        return new UpdateSupplierUseCase(repo);
      },

      inject: [SupplierMongooseRepository],
    },
    {
      provide: DeleteSupplierUseCase,
      useFactory: (repo: RepositoryInterface<SupplierDomain>) => {
        return new DeleteSupplierUseCase(repo);
      },

      inject: [SupplierMongooseRepository],
    },
  ],
})
export class SupplierModule {}
