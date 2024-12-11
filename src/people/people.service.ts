import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SwapiUtils } from 'src/common/utils/swapi.utils';

@Injectable()
export class PeopleService {
    constructor(private readonly swapiUtils: SwapiUtils) {}

    private readonly toFetch = ['homeworld', 'films', 'species', 'vehicles', 'starships'];

    async getAllPeople(deep: boolean, filters: Record<string, any>): Promise<any> {
        try {
            return await this.swapiUtils.fetchAllData('people', deep ? this.toFetch : [], filters) as any;
        } catch (error) {
            console.error(`getAllPeople: ${error}`);
            throw new InternalServerErrorException('Something went wrong! Please, try again later.');
        }
    }

    async getPersonById(id: number, deep: boolean): Promise<any> {
        try {
            return await this.swapiUtils.fetchOne(`people/${id}`, deep ? this.toFetch : []) as any;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            console.error(`getPersonById: ${error}`);
            throw new InternalServerErrorException('Something went wrong! Please, try again later.');
        }
    }
}
