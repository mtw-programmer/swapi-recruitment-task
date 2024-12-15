import { Test, TestingModule } from '@nestjs/testing';
import { SpeciesService } from './species.service';
import { LoggerModule, PinoLogger } from 'nestjs-pino';
import { PrismaService } from 'src/prisma/prisma.service';
import { SwapiUtils } from 'src/common/utils/swapi.utils';
import { DatabaseUtils } from 'src/common/utils/database.utils';
import { CacheUtils } from 'src/common/utils/cache.utils';

describe('SpeciesService', () => {
  let service: SpeciesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule.forRoot()],
      providers: [SpeciesService, PrismaService, SwapiUtils, DatabaseUtils, CacheUtils, PinoLogger],
    }).compile();

    service = module.get<SpeciesService>(SpeciesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
