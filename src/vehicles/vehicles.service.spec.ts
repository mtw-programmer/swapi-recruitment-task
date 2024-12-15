import { Test, TestingModule } from '@nestjs/testing';
import { VehiclesService } from './vehicles.service';
import { LoggerModule, PinoLogger } from 'nestjs-pino';
import { PrismaService } from 'src/prisma/prisma.service';
import { SwapiUtils } from 'src/common/utils/swapi.utils';
import { DatabaseUtils } from 'src/common/utils/database.utils';
import { CacheUtils } from 'src/common/utils/cache.utils';

describe('VehiclesService', () => {
  let service: VehiclesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule.forRoot()],
      providers: [VehiclesService, PrismaService, SwapiUtils, DatabaseUtils, CacheUtils, PinoLogger],
    }).compile();

    service = module.get<VehiclesService>(VehiclesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
