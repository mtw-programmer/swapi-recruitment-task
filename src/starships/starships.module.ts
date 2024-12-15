import { Module } from '@nestjs/common';
import { StarshipsService } from './starships.service';
import { StarshipsController } from './starships.controller';
import { SwapiUtils } from 'src/common/utils/swapi.utils';
import { CacheUtils } from 'src/common/utils/cache.utils';
import { DatabaseUtils } from 'src/common/utils/database.utils';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [StarshipsService, SwapiUtils, CacheUtils, DatabaseUtils, PrismaService],
  controllers: [StarshipsController]
})
export class StarshipsModule {}
