import { ApiQuery, ApiResponse, ApiProperty } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';
import { InternalErrorSchema, NotFoundErrorSchema } from 'src/common/docs/error-msg.docs';
import { PlanetDto } from 'src/common/dto/planet.dto';

class PlanetsResponseDto {
    @ApiProperty({ type: () => [PlanetDto], description: 'The data object containing the planets (without nesting)' })
    data: PlanetDto[];
}

class PlanetResponseDto {
    @ApiProperty({ type: PlanetDto, description: 'The data object containing the planet (without nesting)' })
    data: PlanetDto;
}

export function PlanetDocsQueries() {
  return applyDecorators(
    ApiQuery({ name: 'name', required: false, type: () => [String] }),
    ApiQuery({ name: 'diameter', required: false, type: () => [String] }),
    ApiQuery({ name: 'rotation_period', required: false, type: () => [String] }),
    ApiQuery({ name: 'orbital_period', required: false, type: () => [String] }),
    ApiQuery({ name: 'gravity', required: false, type: () => [String] }),
    ApiQuery({ name: 'population', required: false, type: () => [String] }),
    ApiQuery({ name: 'climate', required: false, type: () => [String] }),
    ApiQuery({ name: 'terrain', required: false, type: () => [String] }),
    ApiQuery({ name: 'surface_water', required: false, type: () => [String] }),
    ApiQuery({ name: 'residents', required: false, type: () => [String] }),
    ApiQuery({ name: 'films', required: false, type: () => [String] }),
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

export function PlanetsDocsResponses() {
  return applyDecorators(
    ApiResponse({
      status: 200,
      type: PlanetsResponseDto,
      description: 'Successfully returned the data. By default not nested (to see the deep version of Planet check out PlanetNestedDto in Schemas)'
    }),
    ApiResponse({
        status: 500,
        type: InternalErrorSchema,
        description: 'Internal Server Error'
    }),
  );
}

export function PlanetByIdDocsResponses() {
  return applyDecorators(
    ApiResponse({
      status: 200,
      type: PlanetResponseDto,
      description: 'Successfully returned the data. By default not nested (to see the deep version of Planet check out PlanetNestedDto in Schemas)'
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

