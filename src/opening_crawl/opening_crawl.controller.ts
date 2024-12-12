import { Controller } from '@nestjs/common';
import { OpeningCrawlService } from './opening_crawl.service';
import { Get } from '@nestjs/common';

@Controller('opening-crawl')
export class OpeningCrawlController {
    constructor(private readonly openingCrawlService: OpeningCrawlService) {}

    @Get()
    async getUniqueWords() {
        return await this.openingCrawlService.pairUniqueWords();
    }
}
