import { FilmsService } from './films.service';
import { Controller, Param, ParseBoolPipe, Query } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { FilmResponseDto, FilmsResponseDto } from './dto/films-response.dto';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';
import { FilmByIdDocsResponses, FilmDocsQueries, FilmsDocsResponses } from './films.docs';

@Controller('films')
export class FilmsController {
    constructor(private readonly filmsService: FilmsService) {};

    @Get()
    @ApiOperation({ summary: 'Get all films. Records filtered with query params are being seached with "include" and are no case-sensitive.' })
    @FilmDocsQueries()
    @FilmsDocsResponses()
    async getAllFilms(
        @Query() filters: Record<string, any>
    ):Promise<FilmsResponseDto> {
        const result = await this.filmsService.getAllFilms(filters);
        return result;
    }
    
    @Get(':id')
    @ApiOperation({ summary: 'Get film with the given id.' })
    @ApiQuery({
        name: 'deep',
        required: false,
        default: false,
        type: Boolean,
        description: 'Allows you to get data with first-level nested properties'
    })
    @FilmByIdDocsResponses()
    async getFilmById(
        @Param('id') id: number,
        @Query('deep', new ParseBoolPipe({ optional: true })) deep: boolean = false
    ):Promise<FilmResponseDto> {
        const result = await this.filmsService.getFilmById(id, !!deep);
        return result;
    }
}
