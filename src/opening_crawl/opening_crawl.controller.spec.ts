import { Test, TestingModule } from '@nestjs/testing';
import { OpeningCrawlController } from './opening_crawl.controller';
import { OpeningCrawlService } from './opening_crawl.service';

describe('OpeningCrawlController', () => {
  let controller: OpeningCrawlController;
  let service: Partial<OpeningCrawlService>;

  beforeEach(async () => {
    service = {};

    const module: TestingModule = await Test.createTestingModule({
      controllers: [OpeningCrawlController],
      providers: [
        {
          provide: OpeningCrawlService,
          useValue: service,
        },
      ],
    }).compile();

    controller = module.get<OpeningCrawlController>(OpeningCrawlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
