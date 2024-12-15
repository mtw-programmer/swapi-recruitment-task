import { Test, TestingModule } from '@nestjs/testing';
import { SpeciesController } from './species.controller';
import { SpeciesService } from './species.service';

describe('SpeciesController', () => {
  let controller: SpeciesController;
  let service: Partial<SpeciesService>;

  beforeEach(async () => {
    service = {};

    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpeciesController],
      providers: [
        {
          provide: SpeciesService,
          useValue: service,
        },
      ],
    }).compile();

    controller = module.get<SpeciesController>(SpeciesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
