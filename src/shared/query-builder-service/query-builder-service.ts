import { InterfaceQueryBuilderService } from '@shared/interface/outbound/query-builder-service-interface';
import { FilterQuery } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class QueryBuilderService<Domain, Document>
  implements InterfaceQueryBuilderService<Domain, FilterQuery<Document>>
{
  buildQueryMongoose(data: Domain) {
    if (!Object.values(data).some((property) => property)) return;

    const filters: FilterQuery<Document> = {
      $or: Object.entries(data)
        .filter(([, value]) => value !== undefined && value !== null)
        .map(([key, value]) => {
          const filter: Record<string, string> =
            typeof value === 'string' && !key.includes('id')
              ? {
                  [key]: {
                    $regex: new RegExp(value.replace(/\*/g, '.*'), 'i'),
                  },
                }
              : { [`_${key}`]: value };

          return filter;
        }),
    };

    return filters;
  }
}
