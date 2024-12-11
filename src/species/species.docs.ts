import { ApiQuery, ApiResponse, ApiProperty } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';
import { InternalErrorSchema, NotFoundErrorSchema } from 'src/common/docs/error-msg.docs';
import { SpeciesDto } from 'src/common/dto/species.dto';

class SpeciesResponseDto {
    @ApiProperty({ type: [SpeciesDto], description: 'The data object containing the species (without nesting)' })
    data: SpeciesDto[];
}

class OneSpeciesResponseDto {
    @ApiProperty({ type: SpeciesDto, description: 'The data object containing the species (without nesting)' })
    data: SpeciesDto;
}

export function SpeciesDocsQueries() {
  return applyDecorators(
    ApiQuery({ name: 'name', required: false, type: [String] }),
    ApiQuery({ name: 'classification', required: false, type: [String] }),
    ApiQuery({ name: 'designation', required: false, type: [String] }),
    ApiQuery({ name: 'average_height', required: false, type: [String] }),
    ApiQuery({ name: 'average_lifespan', required: false, type: [String] }),
    ApiQuery({ name: 'eye_colors', required: false, type: [String] }),
    ApiQuery({ name: 'hair_colors', required: false, type: [String] }),
    ApiQuery({ name: 'skin_colors', required: false, type: [String] }),
    ApiQuery({ name: 'language', required: false, type: [String] }),
    ApiQuery({ name: 'homeworld', required: false, type: [String] }),
    ApiQuery({ name: 'films', required: false, type: [String] }),
    ApiQuery({ name: 'people', required: false, type: [String] }),
    ApiQuery({ name: 'starships', required: false, type: [String] }),
    ApiQuery({ name: 'vehicles', required: false, type: [String] }),
    ApiQuery({ name: 'url', required: false, type: [String] }),
    ApiQuery({ name: 'created', required: false, type: [String] }),
    ApiQuery({ name: 'edited', required: false, type: [String] }),
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

export function SpeciesDocsResponses() {
  return applyDecorators(
    ApiResponse({
      status: 200,
      type: SpeciesResponseDto,
      description: 'Successfully returned the data. By default not nested (to see the deep version of Species check out SpeciesNestedDto in Schemas)'
    }),
    ApiResponse({
        status: 500,
        type: InternalErrorSchema,
        description: 'Internal Server Error'
    }),
  );
}

export function OneSpeciesDocsResponses() {
  return applyDecorators(
    ApiResponse({
      status: 200,
      type: OneSpeciesResponseDto,
      description: 'Successfully returned the data. By default not nested (to see the deep version of Species check out SpeciesNestedDto in Schemas)'
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

