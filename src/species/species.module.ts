import { Module } from '@nestjs/common';
import { SpeciesService } from './species.service';
import { SpeciesController } from './species.controller';
import { SwapiUtils } from 'src/common/utils/swapi.utils';
import { CacheUtils } from 'src/common/utils/cache.utils';
import { DatabaseUtils } from 'src/common/utils/database.utils';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [SpeciesService, SwapiUtils, CacheUtils, DatabaseUtils, PrismaService],
  controllers: [SpeciesController]
})
export class SpeciesModule {}
