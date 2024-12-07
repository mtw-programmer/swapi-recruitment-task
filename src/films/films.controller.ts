import { FilmsService } from './films.service';
import { Controller } from '@nestjs/common';
import { Get } from '@nestjs/common';

@Controller('films')
export class FilmsController {
    constructor(private readonly filmsService: FilmsService) {}

    @Get()
    async getAllFilms() {
        const result = await this.filmsService.getAllFilms();
        return result;
    }
}
