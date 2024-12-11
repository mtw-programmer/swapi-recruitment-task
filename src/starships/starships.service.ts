import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SwapiUtils } from 'src/common/utils/swapi.utils';
import { StarshipResponseDto, StarshipsResponseDto } from './dto/startships-response.dto';

@Injectable()
export class StarshipsService {
    constructor(private readonly swapiUtils: SwapiUtils) {}

    private readonly toFetch = ['films', 'pilots'];

    async getAllStarships(deep: boolean, filters: Record<string, any>): Promise<StarshipsResponseDto> {
        try {
            return await this.swapiUtils.fetchAllData('starships', deep ? this.toFetch : [], filters) as StarshipsResponseDto;
        } catch (error) {
            console.error(`getAllStarships: ${error}`);
            throw new InternalServerErrorException('Something went wrong! Please, try again later.');
        }
    }

    async getStarshipById(id: number, deep: boolean): Promise<StarshipResponseDto> {
        try {
            return await this.swapiUtils.fetchOne(`starships/${id}`, deep ? this.toFetch : []) as StarshipResponseDto;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            console.error(`getStarshipById: ${error}`);
            throw new InternalServerErrorException('Something went wrong! Please, try again later.');
        }
    }
}
