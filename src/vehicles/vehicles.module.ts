import { Module } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';
import { SwapiUtils } from 'src/common/utils/swapi.utils';

@Module({
  providers: [VehiclesService, SwapiUtils],
  controllers: [VehiclesController]
})
export class VehiclesModule {}
