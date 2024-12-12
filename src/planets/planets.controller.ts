import { PlanetsService } from './planets.service';
import { Controller, Param, ParseBoolPipe, Query } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';
import { PlanetResponseDto, PlanetsResponseDto } from './dto/planets-response.dto';
import { PlanetByIdDocsResponses, PlanetDocsQueries, PlanetsDocsResponses } from './planets.docs';

@Controller('planets')
export class PlanetsController {
    constructor(private readonly planetsService: PlanetsService) {};

    @Get()
    @ApiOperation({ summary: 'Get all planets. Records filtered with query params are being seached with "include" and are no case-sensitive.' })
    @PlanetDocsQueries()
    @PlanetsDocsResponses()
    async getAllPlanets(
        @Query() filters: Record<string, any>
    ):Promise<PlanetsResponseDto> {
        const result = await this.planetsService.getAllPlanets(filters);
        return result;
    }
    
    @Get(':id')
    @ApiOperation({ summary: 'Get planet with the given id.' })
    @ApiQuery({
        name: 'deep',
        required: false,
        default: false,
        type: Boolean,
        description: 'Allows you to get data with first-level nested properties'
    })
    @PlanetByIdDocsResponses()
    async getPlanetById(
        @Param('id') id: number,
        @Query('deep', new ParseBoolPipe({ optional: true })) deep: boolean
    ):Promise<PlanetResponseDto> {
        const result = await this.planetsService.getPlanetById(id, !!deep);
        return result;
    }
}
