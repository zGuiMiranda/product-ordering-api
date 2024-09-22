export interface RedisCacheRepositoryInterface<T> {
  save(data: T): Promise<T>;
  get(key: T): Promise<T>;
}
