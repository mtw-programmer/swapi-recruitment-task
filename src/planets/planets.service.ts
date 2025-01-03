import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SwapiUtils } from 'src/common/utils/swapi.utils';
import { PlanetResponseDto, PlanetsResponseDto } from './dto/planets-response.dto';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class PlanetsService {
    constructor(private readonly swapiUtils: SwapiUtils, private readonly logger: PinoLogger) {}

    async getAllPlanets(filters: Record<string, any>): Promise<PlanetsResponseDto> {
        try {
            return await this.swapiUtils.fetchAllData('planets', filters) as PlanetsResponseDto;
        } catch (error) {
            this.logger.error(`getAllPlanets: ${error}`);
            throw new InternalServerErrorException('Something went wrong! Please, try again later.');
        }
    }

    async getPlanetById(id: number, deep: boolean): Promise<PlanetResponseDto> {
        try {
            return await this.swapiUtils.fetchOne(`planets/${id}`, deep) as PlanetResponseDto;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            this.logger.error(`getPlanetById: ${error}`);
            throw new InternalServerErrorException('Something went wrong! Please, try again later.');
        }
    }
}
