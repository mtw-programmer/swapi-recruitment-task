import { StarshipDto, StarshipNestedDto } from "src/common/dto/starship.dto";

export type StarshipsResponseDto = { data: StarshipDto[] } | { data: StarshipNestedDto[] } | { data: [] };
export type StarshipResponseDto = { data: StarshipDto } | { data: StarshipNestedDto } | { data: [] };
