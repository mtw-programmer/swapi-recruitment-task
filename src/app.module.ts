import { Module } from '@nestjs/common';
import { FilmsModule } from './films/films.module';
import { PeopleModule } from './people/people.module';
import { SpeciesModule } from './species/species.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { StarshipsModule } from './starships/starships.module';
import { PlanetsModule } from './planets/planets.module';

@Module({
  imports: [FilmsModule, PeopleModule, SpeciesModule, VehiclesModule, StarshipsModule, PlanetsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
