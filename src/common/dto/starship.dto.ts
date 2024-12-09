import { FilmResponseDto } from './film.dto';
import { PersonResponseDto } from './person.dto';

export class StarshipResponseDto {
    id: number;
    name: string;
    model?: string;
    starship_class?: string;
    manufacturer?: string;
    cost_in_credits?: string;
    length?: string;
    crew?: string;
    passengers?: string;
    max_atmosphering_speed?: string;
    hyperdrive_rating?: string;
    MGLT?: string;
    cargo_capacity?: string;
    consumables?: string;
    films?: string[];
    people?: string[];
    url?: string;
    created: Date;
    edited: Date;
}

export class StarshipResponseNestedDto {
    id: number;
    name: string;
    model?: string;
    starship_class?: string;
    manufacturer?: string;
    cost_in_credits?: string;
    length?: string;
    crew?: string;
    passengers?: string;
    max_atmosphering_speed?: string;
    hyperdrive_rating?: string;
    MGLT?: string;
    cargo_capacity?: string;
    consumables?: string;
    films?: FilmResponseDto[];
    people?: PersonResponseDto[];
    url?: string;
    created: Date;
    edited: Date;
}
  