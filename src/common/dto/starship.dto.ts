import { FilmDto } from './film.dto';
import { PersonDto } from './person.dto';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

export class StarshipNestedDto {
    @ApiProperty({
        type: String,
    })
    name: string;

    @ApiProperty({
        type: String,
        required: false,
    })
    model?: string;

    @ApiProperty({
        type: String,
        required: false,
    })
    starship_class?: string;

    @ApiProperty({
        type: String,
        required: false,
    })
    manufacturer?: string;

    @ApiProperty({
        type: String,
        required: false,
    })
    cost_in_credits?: string;

    @ApiProperty({
        type: String,
        required: false,
    })
    length?: string;

    @ApiProperty({
        type: String,
        required: false,
    })
    crew?: string;

    @ApiProperty({
        type: String,
        required: false,
    })
    passengers?: string;

    @ApiProperty({
        type: String,
        required: false,
    })
    max_atmosphering_speed?: string;

    @ApiProperty({
        type: String,
        required: false,
    })
    hyperdrive_rating?: string;

    @ApiProperty({
        type: String,
        required: false,
    })
    MGLT?: string;

    @ApiProperty({
        type: String,
        required: false,
    })
    cargo_capacity?: string;

    @ApiProperty({
        type: String,
        required: false,
    })
    consumables?: string;

    @ApiProperty({
        type: [FilmDto],
        required: false,
    })
    films?: FilmDto[];

    @ApiProperty({
        type: [PersonDto],
        required: false,
    })
    pilots?: PersonDto[];

    @ApiProperty({
        type: String,
        required: false,
    })
    url?: string;

    @ApiProperty({
        type: Date,
    })
    created: Date;

    @ApiProperty({
        type: Date,
    })
    edited: Date;
}

@ApiExtraModels(StarshipNestedDto)
export class StarshipDto {
  @ApiProperty({
    type: String,
    description: 'string -- The name of this starship. The common name, such as "Death Star".',
    example: 'Death Star',
  })
  name: string;

  @ApiProperty({
    type: String,
    description: 'string -- The model or official name of this starship. Such as "T-65 X-wing" or "DS-1 Orbital Battle Station".',
    example: 'DS-1 Orbital Battle Station',
    required: false,
  })
  model?: string;

  @ApiProperty({
    type: String,
    description: 'string -- The class of this starship, such as "Starfighter" or "Deep Space Mobile Battlestation".',
    example: 'Deep Space Mobile Battlestation',
    required: false,
  })
  starship_class?: string;

  @ApiProperty({
    type: String,
    description: 'string -- The manufacturer of this starship. Comma separated if more than one.',
    example: 'Imperial Department of Military Research, Sienar Fleet Systems',
    required: false,
  })
  manufacturer?: string;

  @ApiProperty({
    type: String,
    description: 'string -- The cost of this starship new, in galactic credits.',
    example: '1000000000000',
    required: false,
  })
  cost_in_credits?: string;

  @ApiProperty({
    type: String,
    description: 'string -- The length of this starship in meters.',
    example: '120000',
    required: false,
  })
  length?: string;

  @ApiProperty({
    type: String,
    description: 'string -- The number of personnel needed to run or pilot this starship.',
    example: '342953',
    required: false,
  })
  crew?: string;

  @ApiProperty({
    type: String,
    description: 'string -- The number of non-essential people this starship can transport.',
    example: '843342',
    required: false,
  })
  passengers?: string;

  @ApiProperty({
    type: String,
    description: 'string -- The maximum speed of this starship in the atmosphere. "N/A" if this starship is incapable of atmospheric flight.',
    example: 'n/a',
    required: false,
  })
  max_atmosphering_speed?: string;

  @ApiProperty({
    type: String,
    description: 'string -- The class of this starships hyperdrive.',
    example: '4.0',
    required: false,
  })
  hyperdrive_rating?: string;

  @ApiProperty({
    type: String,
    description: 'string -- The Maximum number of Megalights this starship can travel in a standard hour.',
    example: '10 MGLT',
    required: false,
  })
  MGLT?: string;

  @ApiProperty({
    type: String,
    description: 'string -- The maximum number of kilograms that this starship can transport.',
    example: '1000000000000',
    required: false,
  })
  cargo_capacity?: string;

  @ApiProperty({
    type: String,
    description: 'string -- The maximum length of time that this starship can provide consumables for its entire crew without having to resupply.',
    example: '3 years',
    required: false,
  })
  consumables?: string;

  @ApiProperty({
    type: [String],
    description: 'array -- An array of Film URL Resources that this starship has appeared in.',
    example: ['https://swapi.dev/api/films/1/'],
    required: false,
  })
  films?: string[];

  @ApiProperty({
    type: [String],
    description: 'array -- An array of People URL Resources that this starship has been piloted by.',
    example: [],
    required: false,
  })
  pilots?: string[];

  @ApiProperty({
    type: String,
    description: 'string -- The hypermedia URL of this resource.',
    example: 'https://swapi.dev/api/starships/9/',
    required: false,
  })
  url?: string;

  @ApiProperty({
    type: Date,
    description: 'string -- The ISO 8601 date format of the time that this resource was created.',
    example: '2014-12-10T16:36:50.509000Z',
  })
  created: Date;

  @ApiProperty({
    type: Date,
    description: 'string -- The ISO 8601 date format of the time that this resource was edited.',
    example: '2014-12-10T16:36:50.509000Z',
  })
  edited: Date;
}
  