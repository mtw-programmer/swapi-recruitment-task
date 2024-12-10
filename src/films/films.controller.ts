import { FilmsService } from './films.service';
import { Controller, Param, ParseBoolPipe, Query } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { FilmResponseDto, FilmsResponseDto } from './dto/films-response.dto';

@Controller('films')
export class FilmsController {
    constructor(private readonly filmsService: FilmsService) {};

    @Get()
    async getAllFilms(
        @Query('deep', new ParseBoolPipe({ optional: true })) deep: boolean = false,
        @Query() filters: Record<string, string | number | boolean>
    ):Promise<FilmsResponseDto> {
        const result = await this.filmsService.getAllFilms(!!deep, filters);
        return result;
    }
    
    @Get(':id')
    async getFilmById(
        @Param('id') id: number,
        @Query('deep', new ParseBoolPipe({ optional: true })) deep: boolean = false
    ):Promise<FilmResponseDto> {
        const result = await this.filmsService.getFilmById(id, !!deep);
        return result;
    }
}
