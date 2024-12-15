import { Test, TestingModule } from '@nestjs/testing';
import { FilmsService } from './films.service';
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

describe('FilmsService', () => {
    let service: FilmsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FilmsService,
                { provide: SwapiUtils, useValue: mockSwapiUtils },
                { provide: PinoLogger, useValue: mockLogger },
            ],
        }).compile();

        service = module.get<FilmsService>(FilmsService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllFilms', () => {
        it('should return films data', async () => {
            const mockResponse = { data: [{ title: 'A New Hope' }] };
            mockSwapiUtils.fetchAllData.mockResolvedValue(mockResponse);

            const filters = { page: 1 };
            const result = await service.getAllFilms(filters);

            expect(result).toEqual(mockResponse);
            expect(mockSwapiUtils.fetchAllData).toHaveBeenCalledWith('films', filters);
        });

        it('should log error and throw InternalServerErrorException on failure', async () => {
            mockSwapiUtils.fetchAllData.mockRejectedValue(new Error('Fetch failed'));

            await expect(service.getAllFilms({})).rejects.toThrow(InternalServerErrorException);
            expect(mockLogger.error).toHaveBeenCalledWith(expect.stringContaining('getAllFilms'));
        });
    });

    describe('getFilmById', () => {
        it('should return film data by ID', async () => {
            const mockResponse = { title: 'A New Hope' };
            mockSwapiUtils.fetchOne.mockResolvedValue(mockResponse);

            const result = await service.getFilmById(1, true);

            expect(result).toEqual(mockResponse);
            expect(mockSwapiUtils.fetchOne).toHaveBeenCalledWith('films/1', true);
        });

        it('should throw NotFoundException if film is not found', async () => {
            mockSwapiUtils.fetchOne.mockRejectedValue(new NotFoundException());

            await expect(service.getFilmById(999, false)).rejects.toThrow(NotFoundException);
        });

        it('should log error and throw InternalServerErrorException on failure', async () => {
            mockSwapiUtils.fetchOne.mockRejectedValue(new Error('Fetch failed'));

            await expect(service.getFilmById(1, false)).rejects.toThrow(InternalServerErrorException);
            expect(mockLogger.error).toHaveBeenCalledWith(expect.stringContaining('getFilmById'));
        });
    });
});
