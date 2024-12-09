import { FilmResponseDto } from './film.dto';
import { PersonResponseDto } from './person.dto';

export class VehicleResponseDto {
    id: number;
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
    films?: FilmResponseDto[];
    people?: PersonResponseDto[];
    url?: string;
    created: Date;
    edited: Date;
  }
  
export class VehicleResponseNestedDto {
    id: number;
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
    films?: FilmResponseDto[];
    people?: PersonResponseDto[];
    url?: string;
    created: Date;
    edited: Date;
  }
  