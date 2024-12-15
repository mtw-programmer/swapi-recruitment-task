import { Test, TestingModule } from '@nestjs/testing';
import { VehiclesService } from './vehicles.service';
import { SwapiUtils } from 'src/common/utils/swapi.utils';
import { PinoLogger } from 'nestjs-pino';
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';

const mockSwapiUtils = {
    fetchAllData: jest.fn(),
    fetchOne: jest.fn(),
};

const mockLogger = {
    error: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
};

describe('VehiclesService', () => {
    let service: VehiclesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                VehiclesService,
                { provide: SwapiUtils, useValue: mockSwapiUtils },
                { provide: PinoLogger, useValue: mockLogger },
            ],
        }).compile();

        service = module.get<VehiclesService>(VehiclesService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllVehicles', () => {
        it('should return vehicles data', async () => {
            const mockResponse = { data: [{ name: 'Speeder Bike' }] };
            mockSwapiUtils.fetchAllData.mockResolvedValue(mockResponse);

            const filters = { page: 1 };
            const result = await service.getAllVehicles(filters);

            expect(result).toEqual(mockResponse);
            expect(mockSwapiUtils.fetchAllData).toHaveBeenCalledWith('vehicles', filters);
        });

        it('should log error and throw InternalServerErrorException on failure', async () => {
            mockSwapiUtils.fetchAllData.mockRejectedValue(new Error('Fetch failed'));

            await expect(service.getAllVehicles({})).rejects.toThrow(InternalServerErrorException);
            expect(mockLogger.error).toHaveBeenCalledWith(expect.stringContaining('getAllVehicles'));
        });
    });

    describe('getVehicleById', () => {
        it('should return vehicle data by ID', async () => {
            const mockResponse = { name: 'Speeder Bike' };
            mockSwapiUtils.fetchOne.mockResolvedValue(mockResponse);

            const result = await service.getVehicleById(1, true);

            expect(result).toEqual(mockResponse);
            expect(mockSwapiUtils.fetchOne).toHaveBeenCalledWith('vehicles/1', true);
        });

        it('should throw NotFoundException if vehicle is not found', async () => {
            mockSwapiUtils.fetchOne.mockRejectedValue(new NotFoundException());

            await expect(service.getVehicleById(999, false)).rejects.toThrow(NotFoundException);
        });

        it('should log error and throw InternalServerErrorException on failure', async () => {
            mockSwapiUtils.fetchOne.mockRejectedValue(new Error('Fetch failed'));

            await expect(service.getVehicleById(1, false)).rejects.toThrow(InternalServerErrorException);
            expect(mockLogger.error).toHaveBeenCalledWith(expect.stringContaining('getVehicleById'));
        });
    });
});
