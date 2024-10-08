import { Module, Global } from '@nestjs/common';
import { QueryBuilderService } from '@shared/query-builder-service/query-builder-service';

@Global()
@Module({
  providers: [QueryBuilderService],
  exports: [QueryBuilderService],
})
export class SharedModule {}
