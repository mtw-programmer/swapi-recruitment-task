import { FilmsService } from './films.service';
import { Controller, Param, ParseBoolPipe, Query } from '@nestjs/common';
import { Get } from '@nestjs/common';

@Controller('films')
export class FilmsController {
    constructor(private readonly filmsService: FilmsService) {}

    @Get()
    async getAllFilms(
        @Query('deep', new ParseBoolPipe({ optional: true })) deep: boolean = false
    ) {
        const result = await this.filmsService.getAllFilms(!!deep);
        return result;
    }
    
    @Get(':id')
    async getFilmById(
        @Param('id') id: number,
        @Query('deep', new ParseBoolPipe({ optional: true })) deep: boolean = false
    ) {
        const result = await this.filmsService.getFilmById(id, !!deep);
        return result;
    }
}
