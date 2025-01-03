import { Controller, Param, ParseBoolPipe, Query } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';
import { SpeciesService } from './species.service';
import { OneSpeciesResponseDto, SpeciesResponseDto } from './dto/species-response.dto';
import { OneSpeciesDocsResponses, SpeciesDocsQueries, SpeciesDocsResponses } from './species.docs';

@Controller('species')
export class SpeciesController {
    constructor(private readonly speciesService: SpeciesService) {};

    @Get()
    @ApiOperation({ summary: 'Get all species. Records filtered with query params are being seached with "include" and are no case-sensitive.' })
    @SpeciesDocsQueries()
    @SpeciesDocsResponses()
    async getAllSpecies(
        @Query() filters: Record<string, any>
    ):Promise<SpeciesResponseDto> {
        const result = await this.speciesService.getAllSpecies(filters);
        return result;
    }
    
    @Get(':id')
    @ApiOperation({ summary: 'Get species with the given id.' })
    @ApiQuery({
        name: 'deep',
        required: false,
        default: false,
        type: Boolean,
        description: 'Allows you to get data with first-level nested properties'
    })
    @SpeciesDocsQueries()
    @OneSpeciesDocsResponses()
    async getSpeciesById(
        @Param('id') id: number,
        @Query('deep', new ParseBoolPipe({ optional: true })) deep: boolean = false
    ):Promise<OneSpeciesResponseDto> {
        const result = await this.speciesService.getSpeciesById(id, !!deep);
        return result;
    }
}
