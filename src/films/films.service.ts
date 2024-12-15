import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SwapiUtils } from 'src/common/utils/swapi.utils';
import { FilmResponseDto, FilmsResponseDto } from './dto/films-response.dto';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class FilmsService {
    constructor(private readonly swapiUtils: SwapiUtils, private readonly logger: PinoLogger) {}

    async getAllFilms(filters: Record<string, any>): Promise<FilmsResponseDto> {
        try {
            return await this.swapiUtils.fetchAllData('films', filters) as FilmsResponseDto;
        } catch (error) {
            this.logger.error(`getAllFilms: ${error}`);
            throw new InternalServerErrorException('Something went wrong! Please, try again later.');
        }
    }

    async getFilmById(id: number, deep: boolean): Promise<FilmResponseDto> {
        try {
            return await this.swapiUtils.fetchOne(`films/${id}`, deep) as FilmResponseDto;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            this.logger.error(`getFilmById: ${error}`);
            throw new InternalServerErrorException('Something went wrong! Please, try again later.');
        }
    }
}
