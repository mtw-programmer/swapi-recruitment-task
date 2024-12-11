import { ApiQuery, ApiResponse, ApiProperty } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';
import { InternalErrorSchema, NotFoundErrorSchema } from 'src/common/docs/error-msg.docs';
import { StarshipDto } from 'src/common/dto/starship.dto';

class StarshipsResponseDto {
    @ApiProperty({ type: [StarshipDto], description: 'The data object containing the starships (without nesting)' })
    data: StarshipDto[];
}

class StarshipResponseDto {
    @ApiProperty({ type: StarshipDto, description: 'The data object containing the starship (without nesting)' })
    data: StarshipDto;
}

export function StarshipsDocsQueries() {
  return applyDecorators(
    ApiQuery({ name: 'name', required: false, type: [String] }),
    ApiQuery({ name: 'model', required: false, type: [String] }),
    ApiQuery({ name: 'starship_class', required: false, type: [String] }),
    ApiQuery({ name: 'manufacturer', required: false, type: [String] }),
    ApiQuery({ name: 'cost_in_credits', required: false, type: [String] }),
    ApiQuery({ name: 'length', required: false, type: [String] }),
    ApiQuery({ name: 'crew', required: false, type: [String] }),
    ApiQuery({ name: 'passengers', required: false, type: [String] }),
    ApiQuery({ name: 'max_atmosphering_speed', required: false, type: [String] }),
    ApiQuery({ name: 'hyperdrive_rating', required: false, type: [String] }),
    ApiQuery({ name: 'MGLT', required: false, type: [String] }),
    ApiQuery({ name: 'cargo_capacity', required: false, type: [String] }),
    ApiQuery({ name: 'consumables', required: false, type: [String] }),
    ApiQuery({ name: 'films', required: false, type: [String] }),
    ApiQuery({ name: 'pilots', required: false, type: [String] }),
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

export function StarshipsDocsResponses() {
  return applyDecorators(
    ApiResponse({
      status: 200,
      type: StarshipsResponseDto,
      description: 'Successfully returned the data. By default not nested (to see the deep version of Starship check out StarshipNestedDto in Schemas)'
    }),
    ApiResponse({
        status: 500,
        type: InternalErrorSchema,
        description: 'Internal Server Error'
    }),
  );
}

export function StarshipDocsResponses() {
  return applyDecorators(
    ApiResponse({
      status: 200,
      type: StarshipResponseDto,
      description: 'Successfully returned the data. By default not nested (to see the deep version of Starship check out StarshipNestedDto in Schemas)'
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

