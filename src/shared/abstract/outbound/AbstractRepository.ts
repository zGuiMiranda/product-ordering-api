import { AbstractRepositoryInterface } from '@shared/interface/outbound/abstract-repository-interface';

export abstract class AbstractRepository<T, R>
  implements AbstractRepositoryInterface<T, R>
{
  protected readonly model: any;
  constructor(model) {
    this.model = model;
  }
  async findAll(filters: T): Promise<R[]> {
    return this.model.find(filters);
  }

  async create(domain: T): Promise<R> {
    return this.model.create(domain);
  }
  async updateOne<T extends { id: string }>(domain: T): Promise<R> {
    return this.model.findByIdAndUpdate(domain.id, domain, { new: true });
  }

  async deleteOne(condition: T): Promise<R> {
    return this.model.deleteOne(condition);
  }
}
