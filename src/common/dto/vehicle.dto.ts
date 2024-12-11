import { FilmDto } from './film.dto';
import { PersonDto } from './person.dto';

export class VehicleDto {
    name: string;
    model?: string;
    vehicle_class?: string;
    manufacturer?: string;
    length?: string;
    cost_in_credits?: string;
    crew?: string;
    passengers?: string;
    max_atmosphering_speed?: string;
    cargo_capacity?: string;
    consumables?: string;
    films?: FilmDto[];
    people?: PersonDto[];
    url?: string;
    created: Date;
    edited: Date;
  }
  
export class VehicleNestedDto {
    name: string;
    model?: string;
    vehicle_class?: string;
    manufacturer?: string;
    length?: string;
    cost_in_credits?: string;
    crew?: string;
    passengers?: string;
    max_atmosphering_speed?: string;
    cargo_capacity?: string;
    consumables?: string;
    films?: FilmDto[];
    people?: PersonDto[];
    url?: string;
    created: Date;
    edited: Date;
  }
  