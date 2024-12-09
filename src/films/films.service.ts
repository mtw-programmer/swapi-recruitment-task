import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SwapiUtils } from 'src/common/utils/swapi.utils';

@Injectable()
export class FilmsService {
    constructor(private readonly swapiUtils: SwapiUtils) {}

    private readonly toFetch = ['characters', 'planets', 'species', 'starships', 'vehicles'];

    async getAllFilms(deep: boolean) {
        try {
            const films = await this.swapiUtils.fetchAllData('films', deep ? this.toFetch : []);
            return films;
        } catch (error) {
            console.error(`getAllFilms: ${error}`);
            throw new InternalServerErrorException('Something went wrong! Please, try again later.');
        }
    }

    async getFilmById(id: number, deep: boolean) {
        try {
            const film = await this.swapiUtils.fetchOne(`films/${id}`, deep ? this.toFetch : []);
            return film;
        } catch (error) {
            console.error(`getFilmById: ${error}`);
            throw new InternalServerErrorException('Something went wrong! Please, try again later.');
        }
    }
}
