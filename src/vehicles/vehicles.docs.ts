import { ApiQuery, ApiResponse, ApiProperty } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';
import { InternalErrorSchema, NotFoundErrorSchema } from 'src/common/docs/error-msg.docs';
import { VehicleDto } from 'src/common/dto/vehicle.dto';

class VehiclesResponseDto {
    @ApiProperty({ type: () => [VehicleDto], description: 'The data object containing the vehicles (without nesting)' })
    data: VehicleDto[];
}

class VehicleResponseDto {
    @ApiProperty({ type: VehicleDto, description: 'The data object containing the vehicle (without nesting)' })
    data: VehicleDto;
}

export function VehiclesDocsQueries() {
  return applyDecorators(
    ApiQuery({ name: 'name', required: false, type: () => [String] }),
    ApiQuery({ name: 'model', required: false, type: () => [String] }),
    ApiQuery({ name: 'vehicle_class', required: false, type: () => [String] }),
    ApiQuery({ name: 'manufacturer', required: false, type: () => [String] }),
    ApiQuery({ name: 'length', required: false, type: () => [String] }),
    ApiQuery({ name: 'cost_in_credits', required: false, type: () => [String] }),
    ApiQuery({ name: 'crew', required: false, type: () => [String] }),
    ApiQuery({ name: 'passengers', required: false, type: () => [String] }),
    ApiQuery({ name: 'max_atmosphering_speed', required: false, type: () => [String] }),
    ApiQuery({ name: 'cargo_capacity', required: false, type: () => [String] }),
    ApiQuery({ name: 'consumables', required: false, type: () => [String] }),
    ApiQuery({ name: 'films', required: false, type: () => [String] }),
    ApiQuery({ name: 'pilots', required: false, type: () => [String] }),
    ApiQuery({ name: 'url', required: false, type: () => [String] }),
    ApiQuery({ name: 'created', required: false, type: () => [String] }),
    ApiQuery({ name: 'edited', required: false, type: () => [String] }),
    ApiQuery({
        name: 'deep',
        required: false,
        default: false,
        type: Boolean,
        description: 'Allows you to get data with first-level nested properties'
    }),
    ApiQuery({
        name: 'page',
        required: false,
        default: 1,
        type: Number,
        description: 'Allows you to paginate the records (by default 5 per page)'
    }),
  );
}

export function VehiclesDocsResponses() {
  return applyDecorators(
    ApiResponse({
      status: 200,
      type: VehiclesResponseDto,
      description: 'Successfully returned the data. By default not nested (to see the deep version of Vehicle check out VehicleNestedDto in Schemas)'
    }),
    ApiResponse({
        status: 500,
        type: InternalErrorSchema,
        description: 'Internal Server Error'
    }),
  );
}

export function VehicleDocsResponses() {
  return applyDecorators(
    ApiResponse({
      status: 200,
      type: VehicleResponseDto,
      description: 'Successfully returned the data. By default not nested (to see the deep version of Vehicle check out VehicleNestedDto in Schemas)'
    }),
    ApiResponse({
        status: 404,
        type: NotFoundErrorSchema,
        description: 'Not Found Exception'
    }),
    ApiResponse({
        status: 500,
        type: InternalErrorSchema,
        description: 'Internal Server Error'
    }),
  );
}

