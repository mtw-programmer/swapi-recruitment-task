import { PlanetResponseDto } from './planet.dto';
import { PersonResponseDto } from './person.dto';
import { FilmResponseDto } from './film.dto';

export class SpeciesResponseDto {
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
  
export class SpeciesResponseNestedDto {
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
    homeworld?: PlanetResponseDto;
    people?: PersonResponseDto[];
    films?: FilmResponseDto[];
    url: string;
    created: Date;
    edited: Date;
}
  