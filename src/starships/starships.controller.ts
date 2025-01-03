import { StarshipsService } from './starships.service';
import { Controller, Param, ParseBoolPipe, Query } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';
import { StarshipResponseDto, StarshipsResponseDto } from './dto/startships-response.dto';
import { StarshipDocsResponses, StarshipsDocsQueries, StarshipsDocsResponses } from './starships.docs';

@Controller('starships')
export class StarshipsController {
    constructor(private readonly starshipsService: StarshipsService) {};

    @Get()
    @ApiOperation({ summary: 'Get all starships. Records filtered with query params are being seached with "include" and are no case-sensitive.' })
    @StarshipsDocsQueries()
    @StarshipsDocsResponses()
    async getAllStarships(
        @Query() filters: Record<string, any>
    ):Promise<StarshipsResponseDto> {
        const result = await this.starshipsService.getAllStarships(filters);
        return result;
    }
    
    @Get(':id')
    @ApiOperation({ summary: 'Get starship with the given id.' })
    @ApiQuery({
        name: 'deep',
        required: false,
        default: false,
        type: Boolean,
        description: 'Allows you to get data with first-level nested properties'
    })
    @StarshipDocsResponses()
    async getStarshipById(
        @Param('id') id: number,
        @Query('deep', new ParseBoolPipe({ optional: true })) deep: boolean = false
    ):Promise<StarshipResponseDto> {
        const result = await this.starshipsService.getStarshipById(id, !!deep);
        return result;
    }
}
