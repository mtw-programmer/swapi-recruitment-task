import { Module } from '@nestjs/common';
import { FilmsModule } from './films/films.module';
import { PeopleModule } from './people/people.module';
import { SpeciesModule } from './species/species.module';
import { VehiclesModule } from './vehicles/vehicles.module';

@Module({
  imports: [FilmsModule, PeopleModule, SpeciesModule, VehiclesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
