import { Test, TestingModule } from '@nestjs/testing';
import { OpeningCrawlService } from './opening_crawl.service';
import { SwapiUtils } from 'src/common/utils/swapi.utils';
import { PinoLogger, LoggerModule } from 'nestjs-pino';
import { InternalServerErrorException } from '@nestjs/common';
import { CacheUtils } from 'src/common/utils/cache.utils';
import { DatabaseUtils } from 'src/common/utils/database.utils';
import { PrismaService } from 'src/prisma/prisma.service';

describe('OpeningCrawlService', () => {
    let service: any;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [LoggerModule.forRoot()],
            providers: [
                OpeningCrawlService,
                PrismaService,
                {
                    provide: SwapiUtils,
                    useValue: {
                        fetchAllData: jest.fn(),
                    },
                },
                {
                    provide: CacheUtils,
                    useValue: {
                        checkRecordsInCache: jest.fn(),
                        checkRecordInCache: jest.fn(),
                        saveRecordsInCache: jest.fn(),
                        saveRecordInCache: jest.fn(),
                    },
                },
                {
                    provide: DatabaseUtils,
                    useValue: {
                        findOne: jest.fn(),
                        findMany: jest.fn(),
                        saveOne: jest.fn(),
                        saveMany: jest.fn(),
                    },
                },
                {
                    provide: PinoLogger,
                    useValue: {
                        info: jest.fn(),
                        error: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<OpeningCrawlService>(OpeningCrawlService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('fetchAllNames', () => {
        it('should return early if words array is empty', async () => {
            service['words'] = [];

            await service['fetchAllNames']();

            expect(service['names']).toEqual([]);
        });
    });

    describe('pairResults', () => {
        it('should return correct unique word pairs and most frequent names', async () => {
            service['words'] = ['Luke', 'Skywalker', 'Darth', 'Vader', 'Luke'];
            service['names'] = ['Luke', 'Darth'];

            const result = await service['pairResults']();

            expect(result.uniqueWordPairs).toEqual([
                ['luke skywalker', 1],
                ['skywalker darth', 1],
                ['darth vader', 1],
                ['vader luke', 1],
            ]);
            expect(result.mostFrequentNames).toEqual({
                name: 'Luke',
                count: 2,
            });
        });

        it('should return empty pairs and most frequent names if no words are available', async () => {
            service['words'] = [];
            const result = await service['pairResults']();

            expect(result.uniqueWordPairs).toEqual([]);
            expect(result.mostFrequentNames).toEqual({});
        });
    });

    describe('getWordsData', () => {
        it('should return the correct data from the entire process', async () => {
            service['words'] = ['Luke', 'Skywalker'];
            service['names'] = ['Luke', 'Darth'];
            const pairResult = {
                uniqueWordPairs: [['luke skywalker', 1]],
                mostFrequentNames: { name: 'Luke', count: 1 },
            };

            jest.spyOn(service, 'fetchOpeningCrawls').mockResolvedValue(undefined);
            jest.spyOn(service, 'fetchAllNames').mockResolvedValue(undefined);
            jest.spyOn(service, 'pairResults').mockResolvedValue(pairResult);

            const result = await service.getWordsData();

            expect(result).toEqual(pairResult);
        });
    });
});
