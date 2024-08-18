export interface RepositoryInterface<T> {
  save(domain: T): Promise<T>;
  update(domain: T): Promise<T>;
  getAll(domain: T): Promise<T[]>;
  delete(domain: T): Promise<void>;
}
