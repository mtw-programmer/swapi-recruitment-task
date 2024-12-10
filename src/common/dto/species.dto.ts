import { PlanetDto } from './planet.dto';
import { PersonDto } from './person.dto';
import { FilmDto } from './film.dto';

export class SpeciesDto {
    id: number;
    name: string;
    classification?: string;
    designation?: string;
    average_height?: string;
    average_lifespan?: string;
    eye_colors?: string;
    hair_colors?: string;
    skin_colors?: string;
    language?: string;
    homeworld?: string;
    people?: string[];
    films?: string[];
    url: string;
    created: Date;
    edited: Date;
}
  
export class SpeciesNestedDto {
    id: number;
    name: string;
    classification?: string;
    designation?: string;
    average_height?: string;
    average_lifespan?: string;
    eye_colors?: string;
    hair_colors?: string;
    skin_colors?: string;
    language?: string;
    homeworld?: PlanetDto;
    people?: PersonDto[];
    films?: FilmDto[];
    url: string;
    created: Date;
    edited: Date;
}
  