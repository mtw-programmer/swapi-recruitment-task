import { Test, TestingModule } from '@nestjs/testing';
import { StarshipsService } from './starships.service';
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

describe('StarshipsService', () => {
    let service: StarshipsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                StarshipsService,
                { provide: SwapiUtils, useValue: mockSwapiUtils },
                { provide: PinoLogger, useValue: mockLogger },
            ],
        }).compile();

        service = module.get<StarshipsService>(StarshipsService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllStarships', () => {
        it('should return starships data', async () => {
            const mockResponse = { data: [{ name: 'Millennium Falcon' }] };
            mockSwapiUtils.fetchAllData.mockResolvedValue(mockResponse);

            const filters = { page: 1 };
            const result = await service.getAllStarships(filters);

            expect(result).toEqual(mockResponse);
            expect(mockSwapiUtils.fetchAllData).toHaveBeenCalledWith('starships', filters);
        });

        it('should log error and throw InternalServerErrorException on failure', async () => {
            mockSwapiUtils.fetchAllData.mockRejectedValue(new Error('Fetch failed'));

            await expect(service.getAllStarships({})).rejects.toThrow(InternalServerErrorException);
            expect(mockLogger.error).toHaveBeenCalledWith(expect.stringContaining('getAllStarships'));
        });
    });

    describe('getStarshipById', () => {
        it('should return starship data by ID', async () => {
            const mockResponse = { name: 'Millennium Falcon' };
            mockSwapiUtils.fetchOne.mockResolvedValue(mockResponse);

            const result = await service.getStarshipById(1, true);

            expect(result).toEqual(mockResponse);
            expect(mockSwapiUtils.fetchOne).toHaveBeenCalledWith('starships/1', true);
        });

        it('should throw NotFoundException if starship is not found', async () => {
            mockSwapiUtils.fetchOne.mockRejectedValue(new NotFoundException());

            await expect(service.getStarshipById(999, false)).rejects.toThrow(NotFoundException);
        });

        it('should log error and throw InternalServerErrorException on failure', async () => {
            mockSwapiUtils.fetchOne.mockRejectedValue(new Error('Fetch failed'));

            await expect(service.getStarshipById(1, false)).rejects.toThrow(InternalServerErrorException);
            expect(mockLogger.error).toHaveBeenCalledWith(expect.stringContaining('getStarshipById'));
        });
    });
});
