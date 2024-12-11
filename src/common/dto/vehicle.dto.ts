import { FilmDto } from './film.dto';
import { PersonDto } from './person.dto';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

export class VehicleNestedDto {
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
  vehicle_class?: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  manufacturer?: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  length?: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  cost_in_credits?: string;

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

@ApiExtraModels(VehicleNestedDto)
export class VehicleDto {
  @ApiProperty({
    type: String,
    description: 'string -- The name of this vehicle.',
    example: 'Sand Crawler',
  })
  name: string;

  @ApiProperty({
    type: String,
    description: 'string -- The model of this vehicle.',
    example: 'Digger Crawler',
    required: false,
  })
  model?: string;

  @ApiProperty({
    type: String,
    description: 'string -- The class of this vehicle (e.g., "wheeled").',
    example: 'wheeled',
    required: false,
  })
  vehicle_class?: string;

  @ApiProperty({
    type: String,
    description: 'string -- The manufacturer of this vehicle.',
    example: 'Corellia Mining Corporation',
    required: false,
  })
  manufacturer?: string;

  @ApiProperty({
    type: String,
    description: 'string -- The length of this vehicle in meters.',
    example: '36.8',
    required: false,
  })
  length?: string;

  @ApiProperty({
    type: String,
    description: 'string -- The cost of this vehicle in credits.',
    example: '150000',
    required: false,
  })
  cost_in_credits?: string;

  @ApiProperty({
    type: String,
    description: 'string -- The number of crew members required for this vehicle.',
    example: '46',
    required: false,
  })
  crew?: string;

  @ApiProperty({
    type: String,
    description: 'string -- The number of passengers this vehicle can carry.',
    example: '30',
    required: false,
  })
  passengers?: string;

  @ApiProperty({
    type: String,
    description: 'string -- The maximum atmospheric speed of this vehicle in kilometers per hour.',
    example: '30',
    required: false,
  })
  max_atmosphering_speed?: string;

  @ApiProperty({
    type: String,
    description: 'string -- The cargo capacity of this vehicle in kilograms.',
    example: '50000',
    required: false,
  })
  cargo_capacity?: string;

  @ApiProperty({
    type: String,
    description: 'string -- The consumables this vehicle can store, in terms of duration.',
    example: '2 months',
    required: false,
  })
  consumables?: string;

  @ApiProperty({
    type: [String],
    description: 'array -- An array of Film URL Resources that this vehicle has appeared in.',
    example: ['https://swapi.dev/api/films/1/'],
    required: false,
  })
  films?: string[];

  @ApiProperty({
    type: [String],
    description: 'array -- An array of Pilot URL Resources who have piloted this vehicle.',
    example: [],
    required: false,
  })
  pilots?: string[];

  @ApiProperty({
    type: String,
    description: 'string -- The URL of this vehicle resource.',
    example: 'https://swapi.dev/api/vehicles/4/',
  })
  url: string;

  @ApiProperty({
    type: Date,
    description: 'string -- The ISO 8601 date format of the time this resource was created.',
    example: '2014-12-10T15:36:25.724000Z',
  })
  created: Date;

  @ApiProperty({
    type: Date,
    description: 'string -- The ISO 8601 date format of the time this resource was last edited.',
    example: '2014-12-10T15:36:25.724000Z',
  })
  edited: Date;
}

  