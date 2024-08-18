export interface InterfaceQueryBuilderService<T, R> {
  buildQueryMongoose(domain: T): R;
}
