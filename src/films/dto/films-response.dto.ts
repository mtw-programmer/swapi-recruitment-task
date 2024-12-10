import { FilmDto, FilmNestedDto } from 'src/common/dto/film.dto';

export type FilmsResponseDto = { data: FilmDto[] } | { data: FilmNestedDto[] } | { data: [] };
export type FilmResponseDto = { data: FilmDto } | { data: FilmNestedDto } | { data: [] };
