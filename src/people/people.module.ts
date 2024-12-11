import { Module } from '@nestjs/common';
import { PeopleService } from './people.service';
import { PeopleController } from './people.controller';
import { SwapiUtils } from 'src/common/utils/swapi.utils';

@Module({
  providers: [PeopleService, SwapiUtils],
  controllers: [PeopleController]
})
export class PeopleModule {}
