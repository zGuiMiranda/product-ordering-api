import { QueryBuilderService } from '../../../shared/query-builder-service/query-builder-service';
import { Injectable } from '@nestjs/common/decorators/core';
import { Supplier } from '../../core/domain/supplier';
import { AbstractRepository } from '@shared/abstract/outbound/AbstractRepository';
import {
  Supplier as SupplierModel,
  SupplierDocument,
} from '../schemas/supplier-schema';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { RepositoryInterface } from '@shared/interface/outbound/repository-interface';

@Injectable()
export class SupplierMongooseRepository
  extends AbstractRepository<
    Supplier | FilterQuery<SupplierDocument>,
    SupplierDocument
  >
  implements RepositoryInterface<Supplier>
{
  constructor(
    @InjectModel(SupplierModel.name) readonly model: Model<SupplierDocument>,
    private readonly queryBuilderService: QueryBuilderService<
      Supplier,
      SupplierDocument
    >,
  ) {
    super(model);
  }
  async delete(domain: Supplier): Promise<void> {
    await this.deleteOne({ _id: domain.getId });
  }
  async update(domain: Supplier): Promise<Supplier> {
    return this.toObject(
      await super.updateOne({ ...domain, id: domain.getId }),
    );
  }
  async save(supplier: Supplier): Promise<Supplier> {
    return this.toObject(await super.create(supplier));
  }
  async getAll(supplier: Supplier): Promise<Supplier[]> {
    return (
      await super.findAll(this.queryBuilderService.buildQueryMongoose(supplier))
    ).map(this.toObject);
  }

  toObject(supplier: SupplierDocument): Supplier {
    return supplier.toObject({
      transform: (_doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        return ret;
      },
    }) as unknown as Supplier;
  }
}
