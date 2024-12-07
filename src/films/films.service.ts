import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class FilmsService {
    async getAllFilms() {
        try {
            const res = await axios.get('https://swapi.dev/api/films', { timeout: 5000 });

            if (!res) {
                console.error('getAllFilms: Could not get response from SWAPI service');
                throw new InternalServerErrorException('Something went wrong. Please, try again later.');
            }

            return res.data;
        } catch (error) {
            console.error(`getAllFilms: ${error}`);
            throw new InternalServerErrorException('Something went wrong! Please, try again later.');
        }
    }
}
