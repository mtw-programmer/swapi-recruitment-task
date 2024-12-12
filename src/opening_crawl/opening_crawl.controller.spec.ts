import { Test, TestingModule } from '@nestjs/testing';
import { OpeningCrawlController } from './opening_crawl.controller';

describe('OpeningCrawlController', () => {
  let controller: OpeningCrawlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OpeningCrawlController],
    }).compile();

    controller = module.get<OpeningCrawlController>(OpeningCrawlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
