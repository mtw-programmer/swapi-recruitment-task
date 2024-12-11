import { FilmDto } from './film.dto';
import { PlanetDto } from './planet.dto';
import { SpeciesDto } from './species.dto';
import { VehicleDto } from './vehicle.dto';
import { StarshipDto } from './starship.dto';

export class PersonDto {
    name: string;
    birth_year?: string;
    eye_color?: string;
    gender?: string;
    hair_color?: string;
    height?: string;
    mass?: string;
    skin_color?: string;
    homeworld?: string;
    films?: string[];
    species?: string[];
    vehicles?: string[];
    starships?: string[];
    url?: string;
    created: Date;
    edited: Date;
  }

export class PersonNestedDto {
    name: string;
    birth_year?: string;
    eye_color?: string;
    gender?: string;
    hair_color?: string;
    height?: string;
    mass?: string;
    skin_color?: string;
    homeworld?: PlanetDto;
    films?: FilmDto[];
    species?: SpeciesDto[];
    vehicles?: VehicleDto[];
    starships?: StarshipDto[];
    url?: string;
    created: Date;
    edited: Date;
  }