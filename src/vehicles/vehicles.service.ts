import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SwapiUtils } from 'src/common/utils/swapi.utils';
import { VehicleResponseDto, VehiclesResponseDto } from './dto/vehicles-response.dto';

@Injectable()
export class VehiclesService {
    constructor(private readonly swapiUtils: SwapiUtils) {}

    async getAllVehicles(filters: Record<string, any>): Promise<any> {
        try {
            return await this.swapiUtils.fetchAllData('vehicles', filters) as VehiclesResponseDto;
        } catch (error) {
            console.error(`getAllVehicles: ${error}`);
            throw new InternalServerErrorException('Something went wrong! Please, try again later.');
        }
    }

    async getVehicleById(id: number, deep: boolean): Promise<any> {
        try {
            return await this.swapiUtils.fetchOne(`vehicles/${id}`, deep) as VehicleResponseDto;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            console.error(`getVehicleById: ${error}`);
            throw new InternalServerErrorException('Something went wrong! Please, try again later.');
        }
    }
}
