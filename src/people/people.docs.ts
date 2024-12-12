import { ApiQuery, ApiResponse, ApiProperty } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';
import { InternalErrorSchema, NotFoundErrorSchema } from 'src/common/docs/error-msg.docs';
import { PersonDto } from 'src/common/dto/person.dto';

class PeopleResponseDto {
    @ApiProperty({ type: () => [PersonDto], description: 'The data object containing the people (without nesting)' })
    data: PersonDto[];
}

class PersonResponseDto {
    @ApiProperty({ type: PersonDto, description: 'The data object containing the person (without nesting)' })
    data: PersonDto;
}

export function PeopleDocsQueries() {
  return applyDecorators(
    ApiQuery({ name: 'name', required: false, type: () => [String] }),
    ApiQuery({ name: 'birth_year', required: false, type: () => [String] }),
    ApiQuery({ name: 'eye_color', required: false, type: () => [String] }),
    ApiQuery({ name: 'gender', required: false, type: () => [String] }),
    ApiQuery({ name: 'hair_color', required: false, type: () => [String] }),
    ApiQuery({ name: 'height', required: false, type: () => [String] }),
    ApiQuery({ name: 'mass', required: false, type: () => [String] }),
    ApiQuery({ name: 'skin_color', required: false, type: () => [String] }),
    ApiQuery({ name: 'homeworld', required: false, type: () => [String] }),
    ApiQuery({ name: 'films', required: false, type: () => [String] }),
    ApiQuery({ name: 'species', required: false, type: () => [String] }),
    ApiQuery({ name: 'vehicles', required: false, type: () => [String] }),
    ApiQuery({ name: 'starships', required: false, type: () => [String] }),
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

export function PeopleDocsResponses() {
  return applyDecorators(
    ApiResponse({
      status: 200,
      type: PeopleResponseDto,
      description: 'Successfully returned the data. By default not nested (to see the deep version of Person check out PersonNestedDto in Schemas)'
    }),
    ApiResponse({
        status: 500,
        type: InternalErrorSchema,
        description: 'Internal Server Error'
    }),
  );
}

export function PersonDocsResponses() {
  return applyDecorators(
    ApiResponse({
      status: 200,
      type: PersonResponseDto,
      description: 'Successfully returned the data. By default not nested (to see the deep version of Person check out PersonNestedDto in Schemas)'
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

