import { Module } from '@nestjs/common';
import { OpeningCrawlService } from './opening_crawl.service';
import { OpeningCrawlController } from './opening_crawl.controller';
import { SwapiUtils } from 'src/common/utils/swapi.utils';

@Module({
  providers: [OpeningCrawlService, SwapiUtils],
  controllers: [OpeningCrawlController]
})
export class OpeningCrawlModule {}
