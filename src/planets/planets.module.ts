import { Module } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { PlanetsController } from './planets.controller';
import { SwapiUtils } from 'src/common/utils/swapi.utils';

@Module({
  providers: [PlanetsService, SwapiUtils],
  controllers: [PlanetsController]
})
export class PlanetsModule {}
