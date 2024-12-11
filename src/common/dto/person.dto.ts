import { FilmDto } from './film.dto';
import { PlanetDto } from './planet.dto';
import { SpeciesDto } from './species.dto';
import { VehicleDto } from './vehicle.dto';
import { StarshipDto } from './starship.dto';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

export class PersonNestedDto {
  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String, required: false })
  birth_year?: string;

  @ApiProperty({ type: String, required: false })
  eye_color?: string;

  @ApiProperty({ type: String, required: false })
  gender?: string;

  @ApiProperty({ type: String, required: false })
  hair_color?: string;

  @ApiProperty({ type: String, required: false })
  height?: string;

  @ApiProperty({ type: String, required: false })
  mass?: string;

  @ApiProperty({ type: String, required: false })
  skin_color?: string;

  @ApiProperty({ type: PlanetDto, required: false })
  homeworld?: PlanetDto;

  @ApiProperty({ type: [FilmDto], required: false })
  films?: FilmDto[];

  @ApiProperty({ type: [SpeciesDto], required: false })
  species?: SpeciesDto[];

  @ApiProperty({ type: [VehicleDto], required: false })
  vehicles?: VehicleDto[];

  @ApiProperty({ type: [StarshipDto], required: false })
  starships?: StarshipDto[];

  @ApiProperty({ type: String, required: false })
  url?: string;

  @ApiProperty({ type: Date })
  created: Date;

  @ApiProperty({ type: Date })
  edited: Date;
}

@ApiExtraModels(PersonNestedDto)
export class PersonDto {
  @ApiProperty({
      type: String,
      description: 'string -- The name of this person.',
      example: 'Luke Skywalker'
  })
  name: string;

  @ApiProperty({
      type: String,
      description: 'string -- The birth year of the person, using the in-universe standard of BBY or ABY. The Battle of Yavin is a battle that occurs at the end of Star Wars episode IV: A New Hope.',
      example: '19 BBY'
  })
  birth_year?: string;

  @ApiProperty({
      type: String,
      description: 'string -- The eye color of this person. Will be "unknown" if not known or "n/a" if the person does not have an eye.',
      example: 'Blue'
  })
  eye_color?: string;

  @ApiProperty({
      type: String,
      description: 'string -- The gender of this person. Either "Male", "Female", "unknown", "n/a" if the person does not have a gender.',
      example: 'Male'
  })
  gender?: string;

  @ApiProperty({
      type: String,
      description: 'string -- The hair color of this person. Will be "unknown" if not known or "n/a" if the person does not have hair.',
      example: 'Blond'
  })
  hair_color?: string;

  @ApiProperty({
      type: String,
      description: 'string -- The height of the person in centimeters.',
      example: '172'
  })
  height?: string;

  @ApiProperty({
      type: String,
      description: 'string -- The mass of the person in kilograms.',
      example: '77'
  })
  mass?: string;

  @ApiProperty({
      type: String,
      description: 'string -- The skin color of this person.',
      example: 'Fair'
  })
  skin_color?: string;

  @ApiProperty({
      type: String,
      description: 'string -- The URL of a planet resource, a planet that this person was born on or inhabits.',
      example: 'https://swapi.dev/api/planets/1/'
  })
  homeworld?: string;

  @ApiProperty({
      type: [String],
      description: 'array -- An array of film resource URLs that this person has been in.',
      example: [
          'https://swapi.dev/api/films/1/',
          'https://swapi.dev/api/films/2/'
      ]
  })
  films?: string[];

  @ApiProperty({
      type: [String],
      description: 'array -- An array of species resource URLs that this person belongs to.',
      example: [
          'https://swapi.dev/api/species/1/'
      ]
  })
  species?: string[];

  @ApiProperty({
      type: [String],
      description: 'array -- An array of starship resource URLs that this person has piloted.',
      example: [
          'https://swapi.dev/api/starships/12/',
          'https://swapi.dev/api/starships/22/'
      ]
  })
  starships?: string[];

  @ApiProperty({
      type: [String],
      description: 'array -- An array of vehicle resource URLs that this person has piloted.',
      example: [
          'https://swapi.dev/api/vehicles/14/'
      ]
  })
  vehicles?: string[];

  @ApiProperty({
      type: String,
      description: 'string -- the hypermedia URL of this resource.',
      example: 'https://swapi.dev/api/people/1/'
  })
  url?: string;

  @ApiProperty({
      type: Date,
      description: 'string -- the ISO 8601 date format of the time that this resource was created.',
      example: '2014-12-09T13:50:51.644000Z'
  })
  created: Date;

  @ApiProperty({
      type: Date,
      description: 'string -- the ISO 8601 date format of the time that this resource was edited.',
      example: '2014-12-10T13:52:43.172000Z'
  })
  edited: Date;
}
