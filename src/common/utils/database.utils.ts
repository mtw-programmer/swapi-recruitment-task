import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';


@Module({
    providers: [DatabaseUtils, PrismaService],
    exports: [DatabaseUtils]
})
export class DatabaseUtils {
    constructor(private readonly prisma: PrismaService) {}

    async findOne(modelName: string, where: object) {
        try {
            const model = this.prisma[modelName];

            if (!model) {
                console.error(`findOne: Model ${modelName} does not exist`);
                throw new Error(`findOne: Model ${modelName} does not exist`);
            }

            return await model.findUnique({ where });
        } catch (error) {
            console.error(`findOne: Model ${modelName} does not exist`);
            throw new Error(`findOne: Error querying ${modelName} model. Message: ${error}`);
        }
    }

    async saveMany(modelName: string, records: object[]) {
        try {
            const model = this.prisma[modelName];

            if (!model) {
                console.error(`saveMany: Model ${modelName} does not exist`);
                throw new Error(`saveMany: Model ${modelName} does not exist`);
            }

            if (!records || !Array.isArray(records) || !records.length) {
                console.error(`saveMany: Model ${modelName} does not exist`);
                throw new Error(`saveMany: Model ${modelName} does not exist`);
            }

            return await model.createMany({
                data: records
            });
        } catch (error) {
            console.error(`saveMany: Model ${modelName} does not exist`);
            throw new Error(`saveMany: Error querying ${modelName} model. Message: ${error}`);
        }
    }

    async findMany(modelName: string, where?: object) {
        try {
            const model = this.prisma[modelName];

            if (!model) {
              console.error(`findMany: Model ${modelName} does not exist`);
              throw new Error(`findMany: Model ${modelName} does not exist`);
            }

            return await model.findMany({ where });
          } catch (error) {
            console.error(`findMany: Model ${modelName} does not exist`);
            throw new Error(`findMany: Error querying ${modelName} model. Message: ${error}`);
          }
    }
}