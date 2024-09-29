export interface RepositoryInterface<T, R> {
  save(domain: T): Promise<T>;
  update(domain: T): Promise<T>;
  getAll(domain: R): Promise<T[]>;
  delete(domain: T): Promise<void>;
}
