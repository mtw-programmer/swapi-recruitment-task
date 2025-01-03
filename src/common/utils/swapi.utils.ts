import { CacheUtils } from './cache.utils';
import { Injectable, NotFoundException, Module, BadRequestException } from '@nestjs/common';
import { toFetch } from './const/toFetch.const';
import { PinoLogger } from 'nestjs-pino';
import { omit } from 'lodash';
import axios from 'axios';

@Injectable()
@Module({
    imports: [CacheUtils],
    providers: [SwapiUtils],
    exports: [SwapiUtils],
  })
export class SwapiUtils {
    constructor(private readonly cacheUtils: CacheUtils, private readonly logger: PinoLogger) {}

    private readonly swapiBaseUrl = 'https://swapi.dev/api/';
    private readonly swapiTimeout = 60000;
    private readonly limitPerPage = 5;

    async fetchAllData(subpage: string, filters: Record<string, any>): Promise<{ data: any[] }> {
        try {
            if (!Array.isArray(toFetch[subpage]) || !toFetch[subpage].length) {
                this.logger.error(`SWAPI Utils: Given subpage ${subpage} is outside range`);
                throw new Error(`SWAPI Utils: Given subpage ${subpage} is outside range`);
            }

            const cachedValue = await this.cacheUtils.checkRecordsInCache(subpage);

            if (cachedValue && !filters.deep) {
                const omitValue = cachedValue.map((record) => omit(record, ['id', 'cache_date', 'individual']));
                return { data: omitValue };
            }

            const url = this.swapiBaseUrl + subpage;

            const res = await axios.get(url, { timeout: this.swapiTimeout });

            if (!res || !res.data || !res.data.results) {
                this.logger.error(`SWAPI Utils: Could not fetch ${url}`);
                throw new Error(`SWAPI Utils: Could not fetch ${url}`);
            }

            this.logger.info(`SWAPI Utils: Successfully fetched ${url}`);

            let data = res.data.results;
            const page = parseInt(filters.page);

            const dataToCache = data.map((record) => ({ ...record }));

            await this.cacheUtils.saveRecordsInCache(subpage, dataToCache);

            if (filters && typeof filters === 'object') {
                for (const [key, property] of Object.entries(filters)) {
                    data = data.filter(
                        (obj) => {
                            const objectProperty = obj[key as keyof typeof obj];
                            if (!objectProperty || key == 'page' || key == 'deep') return true;

                            if (Array.isArray(property)) {
                                return property.some((param) =>
                                    objectProperty.toString().toLowerCase().includes(param.toString().toLowerCase()),
                                );
                            }

                            return objectProperty.toString().toLowerCase().includes(property.toString().toLowerCase());
                        }
                    );
                }
            }

            if (filters.page &&
                typeof page == 'number' &&
                !isNaN(page) &&
                page > 0
            ) {
                const startIndex = (filters.page - 1) * this.limitPerPage;
                const endIndex = startIndex + this.limitPerPage;
                data = data.slice(startIndex, endIndex);
            }

            if (!toFetch[subpage] || !toFetch[subpage]?.length || !filters.deep) return { data };

            let processedData = await Promise.all(
                data.map(async (obj) => {
                    const updatedObj = { ...obj };

                    for (const property of toFetch[subpage]) {
                        if (property == 'deep') continue;
                        else if (typeof obj[property] === 'string' && obj[property].startsWith(this.swapiBaseUrl))
                            updatedObj[property] = (await this.fetchMultipleUrls([obj[property]]))[0];
                        else if (Array.isArray(obj[property]))
                            updatedObj[property] = await this.fetchMultipleUrls(obj[property]);
                        else
                            continue;
                    }

                    return updatedObj;
                })
            );

            return { data: processedData };
        } catch (error) {
            this.logger.error(`SWAPI Utils: ${error}`);
            throw new Error(`SWAPI Utils: ${error}`);
        }
    }
    
    async fetchOne(subpage: string, deep: boolean): Promise<any> {
        try {
            if (!subpage.split('/')[1]) {
                this.logger.error(`fetchOne: Wrong subpage ${subpage} given`);
                throw new BadRequestException('Wrong subpage given!');
            }

            const cachedValue = await this.cacheUtils.checkRecordInCache(subpage.split('/')[0], { url: `${this.swapiBaseUrl}${subpage}/` });

            if (cachedValue)
                return { data: omit(cachedValue, ['id', 'cache_date', 'individual']) };

            const url = this.swapiBaseUrl + subpage;
            const res = await axios.get(url, { timeout: this.swapiTimeout });

            if (!res || !res.data) {
                throw new NotFoundException('Could not find the object with the given ID!');
            }

            this.logger.info(`SWAPI Utils: Successfully fetched ${url}`);

            const subpageType = subpage.split('/')[0];

            await this.cacheUtils.saveRecordInCache(subpage.split('/')[0], res.data);

            if (!Array.isArray(toFetch[subpageType]) || !toFetch[subpageType]?.length || !deep) return { data: res.data };

            const updatedObj = { ...res.data };

            for (const property of toFetch[subpageType]) {
                if (typeof res.data[property] === 'string')
                    updatedObj[property] = (await this.fetchMultipleUrls([res.data[property]]))[0];
                else if (Array.isArray(res.data[property]))
                    updatedObj[property] = await this.fetchMultipleUrls(res.data[property]);
                else
                    continue;
            }

            return { data: updatedObj };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 404) {
                    this.logger.error(`SWAPI Utils: Could not find the url ${this.swapiBaseUrl + subpage}`);
                    throw new NotFoundException('Could not find the object with the given ID!');
                }

                this.logger.error(`SWAPI Utils: Axios Error Response -`, error.response?.data);
                return { error: error.response?.status || 500, msg: 'An unexpected error occurred.' };
            } else {
                this.logger.error(`SWAPI Utils: ${error}`);
                throw new Error(`SWAPI Utils: ${error}`);
            }
        }
    }

    private async fetchMultipleUrls(urls: string[]): Promise<any[]> {
        try {
            if (!urls.length) {
                this.logger.warn('SWAPI Utils: No URLs provided');
                return [];
            }

            if (!Array.isArray(urls)) {
                this.logger.error('SWAPI Utils: Provided URLs are not an array');
                throw new Error('SWAPI Utils: Invalid input, expected an array of URLs');
            }            

            const validUrls = urls.filter((url: string) => url.startsWith(this.swapiBaseUrl));
            if (validUrls.length !== urls.length) {
                const invalidUrls = urls.filter((url: string) => !url.startsWith(this.swapiBaseUrl));
                this.logger.error(`SWAPI Utils: Invalid URLs - ${invalidUrls}`);
                throw new Error(`SWAPI Utils: Invalid URLs - ${invalidUrls}`);
            }

            const fetchedData = await Promise.all(
                validUrls.map(async (url) => {
                    try {
                        const res = await axios.get(url, { timeout: this.swapiTimeout });

                        if (!res || !res.data) {
                            this.logger.error(`SWAPI Utils: Could not fetch ${url}`);
                            throw new Error(`SWAPI Utils: Could not fetch ${url}`);
                        }

                        this.logger.info(`SWAPI Utils: Successfully fetched ${url}`);
                        return res.data;
                    } catch (error) {
                        this.logger.error(`SWAPI Utils: Error fetching ${url} - ${error}`);
                        throw new Error(`SWAPI Utils: Error fetching ${url} - ${error}`);
                    }
                })
            );

            return fetchedData;
        } catch (error) {
            this.logger.error(`SWAPI Utils: ${error}`);
            throw new Error(`SWAPI Utils: ${error}`);
        }
    }
}
