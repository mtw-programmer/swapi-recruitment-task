import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SwapiUtils } from 'src/common/utils/swapi.utils';

@Injectable()
export class FilmsService {
    constructor(private readonly swapiUtils: SwapiUtils) {}

    private readonly toFetch = ['characters', 'planets', 'species', 'starships', 'vehicles'];

    async getAllFilms() {
        try {
            const films = await this.swapiUtils.fetchAllData('films', this.toFetch);
            return films;
        } catch (error) {
            console.error(`getAllFilms: ${error}`);
            throw new InternalServerErrorException('Something went wrong! Please, try again later.');
        }
    }

    async getFilmById(id: number) {
        try {
            const film = await this.swapiUtils.fetchOne(`films/${id}`, this.toFetch);
            return film;
        } catch (error) {
            console.error(`getAllFilms: ${error}`);
            throw new InternalServerErrorException('Something went wrong! Please, try again later.');
        }
    }
}
