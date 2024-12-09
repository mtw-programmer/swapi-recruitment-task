import { Module } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { SwapiUtils } from 'src/common/utils/swapi.utils';

@Module({
  providers: [FilmsService, SwapiUtils],
  controllers: [FilmsController]
})
export class FilmsModule {}
