import { SpeciesDto, SpeciesNestedDto } from "src/common/dto/species.dto";

export type SpeciesResponseDto = { data: SpeciesDto[] } | { data: SpeciesNestedDto[] } | { data: [] };
export type OneSpeciesResponseDto = { data: SpeciesDto } | { data: SpeciesNestedDto } | { data: [] };
