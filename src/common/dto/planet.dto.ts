import { PersonDto } from './person.dto';
import { FilmDto } from './film.dto';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

export class PlanetNestedDto {
  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String, required: false })
  diameter?: string;

  @ApiProperty({ type: String, required: false })
  rotation_period?: string;

  @ApiProperty({ type: String, required: false })
  orbital_period?: string;

  @ApiProperty({ type: String, required: false })
  gravity?: string;

  @ApiProperty({ type: String, required: false })
  population?: string;

  @ApiProperty({ type: String, required: false })
  climate?: string;

  @ApiProperty({ type: String, required: false })
  terrain?: string;

  @ApiProperty({ type: String, required: false })
  surface_water?: string;

  @ApiProperty({ type: () => [PersonDto], required: false })
  residents?: PersonDto[];

  @ApiProperty({ type: () => [FilmDto], required: false })
  films?: FilmDto[];

  @ApiProperty({ type: String })
  url: string;

  @ApiProperty({ type: Date })
  created: Date;

  @ApiProperty({ type: Date })
  edited: Date;
}

@ApiExtraModels(PlanetNestedDto)
export class PlanetDto {
  @ApiProperty({
    type: String,
    description: 'string -- The name of this planet.',
    example: 'Tatooine',
  })
  name: string;

  @ApiProperty({
    type: String,
    description: 'string -- The diameter of this planet in kilometers.',
    example: '10465',
    required: false,
  })
  diameter?: string;

  @ApiProperty({
    type: String,
    description: 'string -- The number of standard hours it takes for this planet to complete a single rotation on its axis.',
    example: '23',
    required: false,
  })
  rotation_period?: string;

  @ApiProperty({
    type: String,
    description: 'string -- The number of standard days it takes for this planet to complete a single orbit of its local star.',
    example: '304',
    required: false,
  })
  orbital_period?: string;

  @ApiProperty({
    type: String,
    description: 'string -- A number denoting the gravity of this planet, where "1" is normal or 1 standard G. "2" is twice or 2 standard Gs. "0.5" is half or 0.5 standard Gs.',
    example: '1',
    required: false,
  })
  gravity?: string;

  @ApiProperty({
    type: String,
    description: 'string -- The average population of sentient beings inhabiting this planet.',
    example: '120000',
    required: false,
  })
  population?: string;

  @ApiProperty({
    type: String,
    description: 'string -- The climate of this planet. Comma separated if diverse.',
    example: 'Arid',
    required: false,
  })
  climate?: string;

  @ApiProperty({
    type: String,
    description: 'string -- The terrain of this planet. Comma separated if diverse.',
    example: 'Desert',
    required: false,
  })
  terrain?: string;

  @ApiProperty({
    type: String,
    description: 'string -- The percentage of the planet surface that is naturally occurring water or bodies of water.',
    example: '1',
    required: false,
  })
  surface_water?: string;

  @ApiProperty({
    type: () => [String],
    description: 'array -- An array of People URL Resources that live on this planet.',
    example: ['https://swapi.dev/api/people/1/', 'https://swapi.dev/api/people/2/'],
    required: false,
  })
  residents?: string[];

  @ApiProperty({
    type: () => [String],
    description: 'array -- An array of Film URL Resources that this planet has appeared in.',
    example: ['https://swapi.dev/api/films/1/', 'https://swapi.dev/api/films/2/'],
    required: false,
  })
  films?: string[];

  @ApiProperty({
    type: String,
    description: 'string -- the hypermedia URL of this resource.',
    example: 'https://swapi.dev/api/planets/1/',
  })
  url: string;

  @ApiProperty({
    type: Date,
    description: 'string -- the ISO 8601 date format of the time that this resource was created.',
    example: '2014-12-09T13:50:49.641000Z',
  })
  created: Date;

  @ApiProperty({
    type: Date,
    description: 'string -- the ISO 8601 date format of the time that this resource was edited.',
    example: '2014-12-15T13:48:16.167217Z',
  })
  edited: Date;
}
  