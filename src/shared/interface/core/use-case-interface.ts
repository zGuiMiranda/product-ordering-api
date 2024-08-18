export interface useCaseInterface<T, R> {
  execute(data: T): Promise<R>;
}
