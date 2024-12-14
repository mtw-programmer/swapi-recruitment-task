import { InternalServerErrorException, Module } from '@nestjs/common';
import { DatabaseUtils } from './database.utils';
import { PinoLogger } from 'nestjs-pino';

@Module({
    imports: [DatabaseUtils],
    providers: [CacheUtils],
    exports: [CacheUtils]
})
export class CacheUtils {
    constructor(private readonly dbUtils: DatabaseUtils, private readonly logger: PinoLogger) {}

    async checkRecordsInCache(model: string, filters?: Record<string, any>) {
        try {
            let response;
            let where = { cache_date: { lte: new Date() } };

            if (filters && typeof filters === 'object' && Object.keys(filters).length) {
                response = await this.dbUtils.findMany(model, { ...where, ...filters });
            }

            response = await this.dbUtils.findMany(model);
            if (!response || !Array.isArray(response) || !response.length) {
                this.logger.info(`checkRecordsInCache: Records for ${model} model not found in cache`);
                return false;
            }

            this.logger.info(`checkRecordsInCache: Found records for ${model} model in cache`);
            return response;
        } catch (error) {
            this.logger.error(`checkRecordsInCache: ${error}`);
            throw new InternalServerErrorException('Something went wrong! Please, try again.');
        }
    }

    async checkRecordInCache(model: string, filters: Record<string, any>) {
        try {
            let response;
            let where = { cache_date: { lte: new Date() } };

            if (!filters || typeof filters !== 'object' || !Object.keys(filters).length) {
                this.logger.error(`checkRecordInCache: No filters given for ${model} model`);
                throw new Error(`checkRecordInCache: No filters given for ${model} model`);
            }

            response = await this.dbUtils.findOne(model, { ...where, ...filters });
            if (!response) {
                this.logger.info(`checkRecordInCache: Records for ${model} model not found in cache`);
                return false;
            }

            this.logger.info(`checkRecordInCache: Found records for ${model} model in cache`);
            return response;
        } catch (error) {
            this.logger.error(`checkRecordInCache: ${error}`);
            throw new InternalServerErrorException('Something went wrong! Please, try again.');
        }
    }

    async saveRecordsInCache(model: string, records: object[]) {
        try {
            await this.dbUtils.saveMany(model, { ...records });
            this.logger.info(`saveRecordsInCache: Saved ${model} models in cache`);
        } catch (error) {
            this.logger.error(`saveRecordsInCache: ${error}`);
            throw new InternalServerErrorException('Something went wrong! Please, try again.');
        }
    }

    async saveRecordInCache(model: string, records: object[]) {
        try {
            await this.dbUtils.saveOne(model, { ...records });
            this.logger.info(`saveRecordsInCache: Saved ${model} models in cache`);
        } catch (error) {
            this.logger.error(`saveRecordsInCache: ${error}`);
            throw new InternalServerErrorException('Something went wrong! Please, try again.');
        }
    }
}