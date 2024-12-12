import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SwapiUtils } from 'src/common/utils/swapi.utils';
import { PlanetResponseDto, PlanetsResponseDto } from './dto/planets-response.dto';

@Injectable()
export class PlanetsService {
    constructor(private readonly swapiUtils: SwapiUtils) {}

    private readonly toFetch = ['residents', 'films'];

    async getAllPlanets(deep: boolean, filters: Record<string, any>): Promise<PlanetsResponseDto> {
        try {
            return await this.swapiUtils.fetchAllData('planets', deep ? this.toFetch : [], filters) as PlanetsResponseDto;
        } catch (error) {
            console.error(`getAllPlanets: ${error}`);
            throw new InternalServerErrorException('Something went wrong! Please, try again later.');
        }
    }

    async getPlanetById(id: number, deep: boolean): Promise<PlanetResponseDto> {
        try {
            return await this.swapiUtils.fetchOne(`planets/${id}`, deep ? this.toFetch : []) as PlanetResponseDto;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            console.error(`getPlanetById: ${error}`);
            throw new InternalServerErrorException('Something went wrong! Please, try again later.');
        }
    }
}
