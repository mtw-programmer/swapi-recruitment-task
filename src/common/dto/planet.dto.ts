import { PersonDto } from './person.dto';
import { FilmDto } from './film.dto';

export class PlanetDto {
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

export class PlanetNestedDto {
    name: string;
    diameter?: string;
    rotation_period?: string;
    orbital_period?: string;
    gravity?: string;
    population?: string;
    climate?: string;
    terrain?: string;
    surface_water?: string;
    residents?: PersonDto[];
    films?: FilmDto[];
    url: string;
    created: Date;
    edited: Date;
  }
  