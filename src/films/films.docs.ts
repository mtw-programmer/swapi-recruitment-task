import { ApiQuery, ApiResponse, ApiProperty } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';
import { FilmDto } from 'src/common/dto/film.dto';
import { InternalErrorSchema, NotFoundErrorSchema } from 'src/common/docs/error-msg.docs';

class FilmsResponseDto {
    @ApiProperty({ type: [FilmDto], description: 'The data object containing the films (without nesting)' })
    data: FilmDto[];
}

class FilmResponseDto {
    @ApiProperty({ type: FilmDto, description: 'The data object containing the film (without nesting)' })
    data: FilmDto;
}

export function FilmDocsQueries() {
  return applyDecorators(
    ApiQuery({ name: 'title', required: false, type: [String] }),
    ApiQuery({ name: 'episode_id', required: false, type: [Number] }),
    ApiQuery({ name: 'opening_crawl', required: false, type: [String] }),
    ApiQuery({ name: 'director', required: false, type: [String] }),
    ApiQuery({ name: 'producer', required: false, type: [String] }),
    ApiQuery({ name: 'release_date', required: false, type: [String] }),
    ApiQuery({ name: 'species', required: false, type: [String] }),
    ApiQuery({ name: 'starships', required: false, type: [String] }),
    ApiQuery({ name: 'vehicles', required: false, type: [String] }),
    ApiQuery({ name: 'characters', required: false, type: [String] }),
    ApiQuery({ name: 'planets', required: false, type: [String] }),
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

export function FilmsDocsResponses() {
  return applyDecorators(
    ApiResponse({
      status: 200,
      type: FilmsResponseDto,
      description: 'Successfully returned the data. By default not nested (to see the deep version of Film check out FilmNestedDto in Schemas)'
    }),
    ApiResponse({
        status: 500,
        type: InternalErrorSchema,
        description: 'Internal Server Error'
    }),
  );
}

export function FilmByIdDocsResponses() {
  return applyDecorators(
    ApiResponse({
      status: 200,
      type: FilmResponseDto,
      description: 'Successfully returned the data. By default not nested (to see the deep version of Film check out FilmNestedDto in Schemas)'
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

