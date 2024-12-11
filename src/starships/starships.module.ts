import { Module } from '@nestjs/common';
import { StarshipsService } from './starships.service';
import { StarshipsController } from './starships.controller';
import { SwapiUtils } from 'src/common/utils/swapi.utils';

@Module({
  providers: [StarshipsService, SwapiUtils],
  controllers: [StarshipsController]
})
export class StarshipsModule {}
