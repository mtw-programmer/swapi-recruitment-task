import { Test, TestingModule } from '@nestjs/testing';
import { StarshipsService } from './starships.service';
import { LoggerModule, PinoLogger } from 'nestjs-pino';
import { PrismaService } from 'src/prisma/prisma.service';
import { SwapiUtils } from 'src/common/utils/swapi.utils';
import { DatabaseUtils } from 'src/common/utils/database.utils';
import { CacheUtils } from 'src/common/utils/cache.utils';

describe('StarshipsService', () => {
  let service: StarshipsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule.forRoot()],
      providers: [StarshipsService, PrismaService, SwapiUtils, DatabaseUtils, CacheUtils, PinoLogger],
    }).compile();

    service = module.get<StarshipsService>(StarshipsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
