import { Test, TestingModule } from '@nestjs/testing';
import { SpeciesService } from './species.service';
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

describe('SpeciesService', () => {
    let service: SpeciesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                SpeciesService,
                { provide: SwapiUtils, useValue: mockSwapiUtils },
                { provide: PinoLogger, useValue: mockLogger },
            ],
        }).compile();

        service = module.get<SpeciesService>(SpeciesService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllSpecies', () => {
        it('should return species data', async () => {
            const mockResponse = { data: [{ name: 'Human' }] };
            mockSwapiUtils.fetchAllData.mockResolvedValue(mockResponse);

            const filters = { page: 1 };
            const result = await service.getAllSpecies(filters);

            expect(result).toEqual(mockResponse);
            expect(mockSwapiUtils.fetchAllData).toHaveBeenCalledWith('species', filters);
        });

        it('should log error and throw InternalServerErrorException on failure', async () => {
            mockSwapiUtils.fetchAllData.mockRejectedValue(new Error('Fetch failed'));

            await expect(service.getAllSpecies({})).rejects.toThrow(InternalServerErrorException);
            expect(mockLogger.error).toHaveBeenCalledWith(expect.stringContaining('getAllSpecies'));
        });
    });

    describe('getSpeciesById', () => {
        it('should return species data by ID', async () => {
            const mockResponse = { name: 'Human' };
            mockSwapiUtils.fetchOne.mockResolvedValue(mockResponse);

            const result = await service.getSpeciesById(1, true);

            expect(result).toEqual(mockResponse);
            expect(mockSwapiUtils.fetchOne).toHaveBeenCalledWith('species/1', true);
        });

        it('should throw NotFoundException if species is not found', async () => {
            mockSwapiUtils.fetchOne.mockRejectedValue(new NotFoundException());

            await expect(service.getSpeciesById(999, false)).rejects.toThrow(NotFoundException);
        });

        it('should log error and throw InternalServerErrorException on failure', async () => {
            mockSwapiUtils.fetchOne.mockRejectedValue(new Error('Fetch failed'));

            await expect(service.getSpeciesById(1, false)).rejects.toThrow(InternalServerErrorException);
            expect(mockLogger.error).toHaveBeenCalledWith(expect.stringContaining('getSpeciesById'));
        });
    });
});
