import { Controller } from '@nestjs/common';
import { OpeningCrawlService } from './opening_crawl.service';
import { Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { InternalErrorSchema, NotFoundErrorSchema } from 'src/common/docs/error-msg.docs';
import { OpeningCrawlResponseDto } from './opening_crawl.response.dto';

@Controller('opening-crawl')
export class OpeningCrawlController {
    constructor(private readonly openingCrawlService: OpeningCrawlService) {}

    @Get()
    @ApiOperation({ summary: 'Get pairs of unique words and most frequent name from crawl openings' })
    @ApiResponse({
        status: 200,
        type: OpeningCrawlResponseDto,
        description: 'Successfuly get data',
    })
    @ApiResponse({
        status: 500,
        type: InternalErrorSchema,
        description: 'Internal Server Error',
    })
    async getUniqueWords() {
        return await this.openingCrawlService.getWordsData();
    }
}
