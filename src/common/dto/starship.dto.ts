import { FilmDto } from './film.dto';
import { PersonDto } from './person.dto';

export class StarshipDto {
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
    pilots?: string[];
    url?: string;
    created: Date;
    edited: Date;
}

export class StarshipNestedDto {
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
    pilots?: PersonDto[];
    url?: string;
    created: Date;
    edited: Date;
}
  