import { InternalServerErrorException, Module } from "@nestjs/common";
import { DatabaseUtils } from "./database.utils";

@Module({
    imports: [DatabaseUtils],
    providers: [CacheUtils],
    exports: [CacheUtils]
})
export class CacheUtils {
    constructor(private readonly dbUtils: DatabaseUtils) {}

    async checkRecordInCache(model: string, filters?: Record<string, any>) {
        // model = people
        // filters = { name: 'Luke' }

        try {
            const res = await this.dbUtils.findMany(model);
            if (!res) return false;

            return res;
        } catch (error) {
            console.error(`checkRecordInCache: ${error}`);
            throw new InternalServerErrorException('Something went wrong! Please, try again.');
        }

        // SELECT FROM people WHERE date <= curr date
        // CRON for cleaning data
        // 


        // people
        // people/1
    }
}