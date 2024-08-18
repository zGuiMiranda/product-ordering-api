export interface AbstractRepositoryInterface<T, R> {
  create(domain: T): Promise<R>;
  findAll(filters: T): Promise<R[]>;
}
