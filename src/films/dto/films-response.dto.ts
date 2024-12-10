import { FilmDto, FilmNestedDto } from 'src/common/dto/film.dto';

export type FilmsResponseDto = FilmDto[] | FilmNestedDto[] | [];
export type FilmResponseDto = FilmDto | FilmNestedDto | [];
