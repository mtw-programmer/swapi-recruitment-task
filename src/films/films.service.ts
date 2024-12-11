import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SwapiUtils } from 'src/common/utils/swapi.utils';
import { FilmResponseDto, FilmsResponseDto } from './dto/films-response.dto';

@Injectable()
export class FilmsService {
    constructor(private readonly swapiUtils: SwapiUtils) {}

    private readonly toFetch = ['characters', 'planets', 'species', 'starships', 'vehicles'];

    async getAllFilms(deep: boolean, filters: Record<string, any>): Promise<FilmsResponseDto> {
        try {
            return await this.swapiUtils.fetchAllData('films', deep ? this.toFetch : [], filters) as FilmsResponseDto;
        } catch (error) {
            console.error(`getAllFilms: ${error}`);
            throw new InternalServerErrorException('Something went wrong! Please, try again later.');
        }
    }

    async getFilmById(id: number, deep: boolean): Promise<FilmResponseDto> {
        try {
            return await this.swapiUtils.fetchOne(`films/${id}`, deep ? this.toFetch : []) as FilmResponseDto;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            console.error(`getFilmById: ${error}`);
            throw new InternalServerErrorException('Something went wrong! Please, try again later.');
        }
    }
}
