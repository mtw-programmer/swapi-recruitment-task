import { PersonResponseDto } from './person.dto';
import { FilmResponseDto } from './film.dto';

export class PlanetResponseDto {
    id: number;
    name: string;
    diameter?: string;
    rotation_period?: string;
    orbital_period?: string;
    gravity?: string;
    population?: string;
    climate?: string;
    terrain?: string;
    surface_water?: string;
    residents?: string[];
    films?: string[];
    url: string;
    created: Date;
    edited: Date;
  }

export class PlanetResponseNestedDto {
    id: number;
    name: string;
    diameter?: string;
    rotation_period?: string;
    orbital_period?: string;
    gravity?: string;
    population?: string;
    climate?: string;
    terrain?: string;
    surface_water?: string;
    residents?: PersonResponseDto[];
    films?: FilmResponseDto[];
    url: string;
    created: Date;
    edited: Date;
  }
  