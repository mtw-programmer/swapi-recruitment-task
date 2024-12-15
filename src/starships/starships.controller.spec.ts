import { Test, TestingModule } from '@nestjs/testing';
import { StarshipsController } from './starships.controller';
import { StarshipsService } from './starships.service';

describe('StarshipsController', () => {
  let controller: StarshipsController;
  let service: Partial<StarshipsService>;

  beforeEach(async () => {
    service = {};

    const module: TestingModule = await Test.createTestingModule({
      controllers: [StarshipsController],
      providers: [
        {
          provide: StarshipsService,
          useValue: service,
        },
      ],
    }).compile();

    controller = module.get<StarshipsController>(StarshipsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
