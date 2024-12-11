import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SwapiUtils } from 'src/common/utils/swapi.utils';

@Injectable()
export class VehiclesService {
    constructor(private readonly swapiUtils: SwapiUtils) {}

    private readonly toFetch = ['films', 'pilots'];

    async getAllVehicles(deep: boolean, filters: Record<string, any>): Promise<any> {
        try {
            return await this.swapiUtils.fetchAllData('vehicles', deep ? this.toFetch : [], filters) as any;
        } catch (error) {
            console.error(`getAllVehicles: ${error}`);
            throw new InternalServerErrorException('Something went wrong! Please, try again later.');
        }
    }

    async getVehicleById(id: number, deep: boolean): Promise<any> {
        try {
            return await this.swapiUtils.fetchOne(`vehicles/${id}`, deep ? this.toFetch : []) as any;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            console.error(`getVehicleById: ${error}`);
            throw new InternalServerErrorException('Something went wrong! Please, try again later.');
        }
    }
}
