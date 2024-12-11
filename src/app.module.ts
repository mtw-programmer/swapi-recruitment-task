import { Module } from '@nestjs/common';
import { FilmsModule } from './films/films.module';
import { PeopleModule } from './people/people.module';
import { SpeciesModule } from './species/species.module';

@Module({
  imports: [FilmsModule, PeopleModule, SpeciesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
