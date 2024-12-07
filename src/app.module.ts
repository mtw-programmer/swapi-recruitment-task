import { Module } from '@nestjs/common';
import { FilmsModule } from './films/films.module';

@Module({
  imports: [FilmsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
