import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SwapiUtils } from 'src/common/utils/swapi.utils';

@Injectable()
export class FilmsService {
    constructor(private readonly swapiUtils: SwapiUtils) {}

    async getAllFilms() {
        try {
            const films = await this.swapiUtils.fetchAllData('films', ['characters', 'planets', 'species', 'starships', 'vehicles']);
            return films;
        } catch (error) {
            console.error(`getAllFilms: ${error}`);
            throw new InternalServerErrorException('Something went wrong! Please, try again later.');
        }
    }
}
