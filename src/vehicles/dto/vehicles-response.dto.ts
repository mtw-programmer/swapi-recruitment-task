import { VehicleDto, VehicleNestedDto } from "src/common/dto/vehicle.dto";

export type VehiclesResponseDto = { data: VehicleDto[] } | { data: VehicleNestedDto[] } | { data: [] };
export type VehicleResponseDto = { data: VehicleDto } | { data: VehicleNestedDto } | { data: [] };
