import { PlanetDto, PlanetNestedDto } from 'src/common/dto/planet.dto';


export type PlanetsResponseDto = { data: PlanetDto[] } | { data: PlanetNestedDto[] } | { data: [] };
export type PlanetResponseDto = { data: PlanetDto } | { data: PlanetNestedDto } | { data: [] };
