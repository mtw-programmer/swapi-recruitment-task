import { Module } from '@nestjs/common';
import { SpeciesService } from './species.service';
import { SpeciesController } from './species.controller';
import { SwapiUtils } from 'src/common/utils/swapi.utils';

@Module({
  providers: [SpeciesService, SwapiUtils],
  controllers: [SpeciesController]
})
export class SpeciesModule {}
