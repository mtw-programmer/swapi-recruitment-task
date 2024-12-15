import { Test, TestingModule } from '@nestjs/testing';
import { PlanetsService } from './planets.service';
import { SwapiUtils } from 'src/common/utils/swapi.utils';
import { PinoLogger } from 'nestjs-pino';
import { NotFoundException, InternalServerErrorException } from '@nestjs/common';

const mockSwapiUtils = {
    fetchAllData: jest.fn(),
    fetchOne: jest.fn(),
};

const mockLogger = {
    error: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
};

describe('PlanetsService', () => {
    let service: PlanetsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PlanetsService,
                { provide: SwapiUtils, useValue: mockSwapiUtils },
                { provide: PinoLogger, useValue: mockLogger },
            ],
        }).compile();

        service = module.get<PlanetsService>(PlanetsService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllPlanets', () => {
        it('should return planets data', async () => {
            const mockResponse = { data: [{ name: 'Tatooine' }] };
            mockSwapiUtils.fetchAllData.mockResolvedValue(mockResponse);

            const filters = { page: 1 };
            const result = await service.getAllPlanets(filters);

            expect(result).toEqual(mockResponse);
            expect(mockSwapiUtils.fetchAllData).toHaveBeenCalledWith('planets', filters);
        });

        it('should log error and throw InternalServerErrorException on failure', async () => {
            mockSwapiUtils.fetchAllData.mockRejectedValue(new Error('Fetch failed'));

            await expect(service.getAllPlanets({})).rejects.toThrow(InternalServerErrorException);
            expect(mockLogger.error).toHaveBeenCalledWith(expect.stringContaining('getAllPlanets'));
        });
    });

    describe('getPlanetById', () => {
        it('should return planet data by ID', async () => {
            const mockResponse = { name: 'Tatooine' };
            mockSwapiUtils.fetchOne.mockResolvedValue(mockResponse);

            const result = await service.getPlanetById(1, true);

            expect(result).toEqual(mockResponse);
            expect(mockSwapiUtils.fetchOne).toHaveBeenCalledWith('planets/1', true);
        });

        it('should throw NotFoundException if planet is not found', async () => {
            mockSwapiUtils.fetchOne.mockRejectedValue(new NotFoundException());

            await expect(service.getPlanetById(999, false)).rejects.toThrow(NotFoundException);
        });

        it('should log error and throw InternalServerErrorException on failure', async () => {
            mockSwapiUtils.fetchOne.mockRejectedValue(new Error('Fetch failed'));

            await expect(service.getPlanetById(1, false)).rejects.toThrow(InternalServerErrorException);
            expect(mockLogger.error).toHaveBeenCalledWith(expect.stringContaining('getPlanetById'));
        });
    });
});
