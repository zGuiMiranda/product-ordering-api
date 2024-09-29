export interface RedisCacheRepositoryInterface<T, R> {
  save(key: R, data: T): Promise<R>;
  get(key: R): Promise<R>;
}
