import { Module } from '@nestjs/common';
import { OpeningCrawlService } from './opening_crawl.service';
import { OpeningCrawlController } from './opening_crawl.controller';
import { SwapiUtils } from 'src/common/utils/swapi.utils';
import { CacheUtils } from 'src/common/utils/cache.utils';
import { DatabaseUtils } from 'src/common/utils/database.utils';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [OpeningCrawlService, SwapiUtils, CacheUtils, DatabaseUtils, PrismaService],
  controllers: [OpeningCrawlController]
})
export class OpeningCrawlModule {}
