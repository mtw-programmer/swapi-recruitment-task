import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SwapiUtils } from 'src/common/utils/swapi.utils';
import { PeopleResponseDto, PersonResponseDto } from './dto/people-response.dto';

@Injectable()
export class PeopleService {
    constructor(private readonly swapiUtils: SwapiUtils) {}

    private readonly toFetch = ['homeworld', 'films', 'species', 'vehicles', 'starships'];

    async getAllPeople(deep: boolean, filters: Record<string, any>): Promise<PeopleResponseDto> {
        try {
            return await this.swapiUtils.fetchAllData('people', deep ? this.toFetch : [], filters) as PeopleResponseDto;
        } catch (error) {
            console.error(`getAllPeople: ${error}`);
            throw new InternalServerErrorException('Something went wrong! Please, try again later.');
        }
    }

    async getPersonById(id: number, deep: boolean): Promise<PersonResponseDto> {
        try {
            return await this.swapiUtils.fetchOne(`people/${id}`, deep ? this.toFetch : []) as PersonResponseDto;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            console.error(`getPersonById: ${error}`);
            throw new InternalServerErrorException('Something went wrong! Please, try again later.');
        }
    }
}
