import { Test, TestingModule } from '@nestjs/testing';
import { FilmsService } from './films.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { SwapiUtils } from 'src/common/utils/swapi.utils';
import { DatabaseUtils } from 'src/common/utils/database.utils';
import { CacheUtils } from 'src/common/utils/cache.utils';
import { LoggerModule, PinoLogger } from 'nestjs-pino';

describe('FilmsService', () => {
  let service: FilmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule.forRoot()],
      providers: [FilmsService, PrismaService, SwapiUtils, DatabaseUtils, CacheUtils, PinoLogger],
    }).compile();

    service = module.get<FilmsService>(FilmsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
