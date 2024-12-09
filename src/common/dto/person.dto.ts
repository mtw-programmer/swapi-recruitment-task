import { FilmResponseDto } from './film.dto';
import { PlanetResponseDto } from './planet.dto';
import { SpeciesResponseDto } from './species.dto';
import { VehicleResponseDto } from './vehicle.dto';
import { StarshipResponseDto } from './starship.dto';

export class PersonResponseDto {
    id: number;
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

export class PersonResponseNestedDto {
    id: number;
    name: string;
    birth_year?: string;
    eye_color?: string;
    gender?: string;
    hair_color?: string;
    height?: string;
    mass?: string;
    skin_color?: string;
    homeworld?: PlanetResponseDto;
    films?: FilmResponseDto[];
    species?: SpeciesResponseDto[];
    vehicles?: VehicleResponseDto[];
    starships?: StarshipResponseDto[];
    url?: string;
    created: Date;
    edited: Date;
  }