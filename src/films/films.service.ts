import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SwapiUtils } from 'src/common/utils/swapi.utils';
import { FilmResponseDto, FilmsResponseDto } from './dto/films-response.dto';

@Injectable()
export class FilmsService {
    constructor(private readonly swapiUtils: SwapiUtils) {}

    private readonly toFetch = ['characters', 'planets', 'species', 'starships', 'vehicles'];

    async getAllFilms(deep: boolean, filters): Promise<FilmsResponseDto> {
        try {
            const films = await this.swapiUtils.fetchAllData('films', deep ? this.toFetch : [], filters) as FilmsResponseDto;
            return films;
        } catch (error) {
            console.error(`getAllFilms: ${error}`);
            throw new InternalServerErrorException('Something went wrong! Please, try again later.');
        }
    }

    async getFilmById(id: number, deep: boolean): Promise<FilmResponseDto> {
        try {
            const film = await this.swapiUtils.fetchOne(`films/${id}`, deep ? this.toFetch : []) as FilmResponseDto;
            return film;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            console.error(`getFilmById: ${error}`);
            throw new InternalServerErrorException('Something went wrong! Please, try again later.');
        }
    }
}
