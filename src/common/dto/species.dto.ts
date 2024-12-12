import { PlanetDto } from './planet.dto';
import { PersonDto } from './person.dto';
import { FilmDto } from './film.dto';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
  
export class SpeciesNestedDto {
    @ApiProperty({ type: String })
    name: string;

    @ApiProperty({ type: String, required: false })
    classification?: string;

    @ApiProperty({ type: String, required: false })
    designation?: string;

    @ApiProperty({ type: String, required: false })
    average_height?: string;

    @ApiProperty({ type: String, required: false })
    average_lifespan?: string;

    @ApiProperty({ type: String, required: false })
    eye_colors?: string;

    @ApiProperty({ type: String, required: false })
    hair_colors?: string;

    @ApiProperty({ type: String, required: false })
    skin_colors?: string;

    @ApiProperty({ type: String, required: false })
    language?: string;

    @ApiProperty({ type: () => PlanetDto, required: false })
    homeworld?: PlanetDto;

    @ApiProperty({ type: () => [PersonDto], required: false })
    people?: PersonDto[];

    @ApiProperty({ type: () => [FilmDto], required: false })
    films?: FilmDto[];

    @ApiProperty({ type: String })
    url: string;

    @ApiProperty({ type: Date })
    created: Date;

    @ApiProperty({ type: Date })
    edited: Date;
}


@ApiExtraModels(SpeciesNestedDto)
export class SpeciesDto {
    @ApiProperty({
      type: String,
      description: 'string -- The name of this species.',
      example: 'Human',
    })
    name: string;
  
    @ApiProperty({
      type: String,
      description: 'string -- The classification of this species, such as "mammal" or "reptile".',
      example: 'Mammal',
      required: false,
    })
    classification?: string;
  
    @ApiProperty({
      type: String,
      description: 'string -- The designation of this species, such as "sentient".',
      example: 'Sentient',
      required: false,
    })
    designation?: string;
  
    @ApiProperty({
      type: String,
      description: 'string -- The average height of this species in centimeters.',
      example: '180',
      required: false,
    })
    average_height?: string;
  
    @ApiProperty({
      type: String,
      description: 'string -- The average lifespan of this species in years.',
      example: '100',
      required: false,
    })
    average_lifespan?: string;
  
    @ApiProperty({
      type: String,
      description: 'string -- A comma-separated string of common eye colors for this species, "none" if this species does not typically have eyes.',
      example: 'Blue, Green',
      required: false,
    })
    eye_colors?: string;
  
    @ApiProperty({
      type: String,
      description: 'string -- A comma-separated string of common hair colors for this species, "none" if this species does not typically have hair.',
      example: 'Blond, Brown',
      required: false,
    })
    hair_colors?: string;
  
    @ApiProperty({
      type: String,
      description: 'string -- A comma-separated string of common skin colors for this species, "none" if this species does not typically have skin.',
      example: 'Fair, Olive',
      required: false,
    })
    skin_colors?: string;
  
    @ApiProperty({
      type: String,
      description: 'string -- The language commonly spoken by this species.',
      example: 'Basic',
      required: false,
    })
    language?: string;
  
    @ApiProperty({
      type: String,
      description: 'string -- The URL of a planet resource, a planet that this species originates from.',
      example: 'https://swapi.dev/api/planets/1/',
      required: false,
    })
    homeworld?: string;
  
    @ApiProperty({
      type: () => [String],
      description: 'array -- An array of People URL Resources that are a part of this species.',
      example: ['https://swapi.dev/api/people/1/', 'https://swapi.dev/api/people/2/'],
      required: false,
    })
    people?: string[];
  
    @ApiProperty({
      type: () => [String],
      description: 'array -- An array of Film URL Resources that this species has appeared in.',
      example: ['https://swapi.dev/api/films/1/', 'https://swapi.dev/api/films/2/'],
      required: false,
    })
    films?: string[];
  
    @ApiProperty({
      type: String,
      description: 'string -- the hypermedia URL of this resource.',
      example: 'https://swapi.dev/api/species/1/',
    })
    url: string;
  
    @ApiProperty({
      type: Date,
      description: 'string -- the ISO 8601 date format of the time that this resource was created.',
      example: '2014-12-09T13:50:51.644000Z',
    })
    created: Date;
  
    @ApiProperty({
      type: Date,
      description: 'string -- the ISO 8601 date format of the time that this resource was edited.',
      example: '2014-12-10T13:52:43.172000Z',
    })
    edited: Date;
  }
  