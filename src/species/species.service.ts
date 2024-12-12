import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SwapiUtils } from 'src/common/utils/swapi.utils';
import { SpeciesResponseDto, OneSpeciesResponseDto } from './dto/species-response.dto';

@Injectable()
export class SpeciesService {
    constructor(private readonly swapiUtils: SwapiUtils) {}

    async getAllSpecies(filters: Record<string, any>): Promise<SpeciesResponseDto> {
        try {
            const species = await this.swapiUtils.fetchAllData('species', filters) as SpeciesResponseDto;
            return species;
        } catch (error) {
            console.error(`getAllSpecies: ${error}`);
            throw new InternalServerErrorException('Something went wrong! Please, try again later.');
        }
    }

    async getSpeciesById(id: number, deep: boolean): Promise<OneSpeciesResponseDto> {
        try {
            const species = await this.swapiUtils.fetchOne(`species/${id}`, deep) as OneSpeciesResponseDto;
            return species;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            console.error(`getSpeciesById: ${error}`);
            throw new InternalServerErrorException('Something went wrong! Please, try again later.');
        }
    }
}
