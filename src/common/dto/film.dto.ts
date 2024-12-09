import { SpeciesResponseDto } from './species.dto';
import { StarshipResponseDto } from './starship.dto';
import { VehicleResponseDto } from './vehicle.dto';
import { PersonResponseDto } from './person.dto';
import { PlanetResponseDto } from './planet.dto';

export class FilmResponseDto {
    id: number;
    title: string;
    episode_id: number;
    opening_crawl?: string;
    director?: string;
    producer?: string;
    release_date: Date;
    species?: string[];
    starships?: string[];
    vehicles?: string[];
    characters?: string[];
    planets?: string[];
    url: string;
    created: Date;
    edited: Date;
}

export class FilmResponseNestedDto {
    id: number;
    title: string;
    episode_id: number;
    opening_crawl?: string;
    director?: string;
    producer?: string;
    release_date: Date;
    species?: SpeciesResponseDto[];
    starships?: StarshipResponseDto[];
    vehicles?: VehicleResponseDto[];
    characters?: PersonResponseDto[];
    planets?: PlanetResponseDto[];
    url: string;
    created: Date;
    edited: Date;
}
  