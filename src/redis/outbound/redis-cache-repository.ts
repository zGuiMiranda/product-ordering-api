import { RedisCacheRepositoryInterface } from '@shared/interface/outbound/redis-cache-repository-interface';

export class RedisCacheRepository
  implements RedisCacheRepositoryInterface<any>
{
  save(data: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
  get(key: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
