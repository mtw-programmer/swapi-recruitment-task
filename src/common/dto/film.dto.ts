import { SpeciesDto } from './species.dto';
import { StarshipDto } from './starship.dto';
import { VehicleDto } from './vehicle.dto';
import { PersonDto } from './person.dto';
import { PlanetDto } from './planet.dto';

export class FilmDto {
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

export class FilmNestedDto {
    id: number;
    title: string;
    episode_id: number;
    opening_crawl?: string;
    director?: string;
    producer?: string;
    release_date: Date;
    species?: SpeciesDto[];
    starships?: StarshipDto[];
    vehicles?: VehicleDto[];
    characters?: PersonDto[];
    planets?: PlanetDto[];
    url: string;
    created: Date;
    edited: Date;
}
  