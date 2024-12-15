import { Module } from '@nestjs/common';
import { PeopleService } from './people.service';
import { PeopleController } from './people.controller';
import { SwapiUtils } from 'src/common/utils/swapi.utils';
import { CacheUtils } from 'src/common/utils/cache.utils';
import { DatabaseUtils } from 'src/common/utils/database.utils';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [PeopleService, SwapiUtils, CacheUtils, DatabaseUtils, PrismaService],
  controllers: [PeopleController]
})
export class PeopleModule {}
