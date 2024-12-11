import { PersonDto, PersonNestedDto } from 'src/common/dto/person.dto';

export type PeopleResponseDto = { data: PersonDto[] } | { data: PersonNestedDto[] } | { data: [] };
export type PersonResponseDto = { data: PersonDto } | { data: PersonNestedDto } | { data: [] };
