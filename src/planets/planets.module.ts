import { Module } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { PlanetsController } from './planets.controller';
import { SwapiUtils } from 'src/common/utils/swapi.utils';
import { CacheUtils } from 'src/common/utils/cache.utils';
import { DatabaseUtils } from 'src/common/utils/database.utils';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [PlanetsService, SwapiUtils, CacheUtils, DatabaseUtils, PrismaService],
  controllers: [PlanetsController]
})
export class PlanetsModule {}
