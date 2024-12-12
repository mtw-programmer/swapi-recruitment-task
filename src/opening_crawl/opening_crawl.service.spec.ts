import { Test, TestingModule } from '@nestjs/testing';
import { OpeningCrawlService } from './opening_crawl.service';

describe('OpeningCrawlService', () => {
  let service: OpeningCrawlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpeningCrawlService],
    }).compile();

    service = module.get<OpeningCrawlService>(OpeningCrawlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
