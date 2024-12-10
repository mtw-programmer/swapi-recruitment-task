import { FilmDto } from './film.dto';
import { PersonDto } from './person.dto';

export class StarshipDto {
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

export class StarshipNestedDto {
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
    films?: FilmDto[];
    people?: PersonDto[];
    url?: string;
    created: Date;
    edited: Date;
}
  