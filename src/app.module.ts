import { Module } from '@nestjs/common';
import { FilmsModule } from './films/films.module';
import { PeopleModule } from './people/people.module';

@Module({
  imports: [FilmsModule, PeopleModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
