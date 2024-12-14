import { InternalServerErrorException, Module } from '@nestjs/common';
import { DatabaseUtils } from './database.utils';

@Module({
    imports: [DatabaseUtils],
    providers: [CacheUtils],
    exports: [CacheUtils]
})
export class CacheUtils {
    constructor(private readonly dbUtils: DatabaseUtils) {}

    async checkRecordsInCache(model: string, filters?: Record<string, any>) {
        try {
            let response;
            let where = { cache_date: { lte: new Date() } };

            if (filters && typeof filters === 'object' && Object.keys(filters).length) {
                response = await this.dbUtils.findMany(model, { ...where, ...filters });
            }

            response = await this.dbUtils.findMany(model);
            if (!response || !Array.isArray(response) || !response.length) {
                console.log(`checkRecordsInCache: Records for ${model} model not found in cache`);
                return false;
            }

            console.log(`checkRecordsInCache: Found records for ${model} model in cache`);
            return response;
        } catch (error) {
            console.error(`checkRecordInCache: ${error}`);
            throw new InternalServerErrorException('Something went wrong! Please, try again.');
        }
    }

    async saveRecordsInCache(model: string, records: object[]) {
        try {
            await this.dbUtils.saveMany(model, records);
            console.log(`saveRecordsInCache: Saved ${model} models in cache`);
        } catch (error) {
            console.error(`saveRecordsInCache: ${error}`);
            throw new InternalServerErrorException('Something went wrong! Please, try again.');
        }
    }
}