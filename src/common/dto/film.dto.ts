import { SpeciesDto } from './species.dto';
import { StarshipDto } from './starship.dto';
import { VehicleDto } from './vehicle.dto';
import { PersonDto } from './person.dto';
import { PlanetDto } from './planet.dto';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

export class FilmNestedDto {
    @ApiProperty({ type: String })
    title: string;

    @ApiProperty({ type: Number })
    episode_id: number;

    @ApiProperty({ type: String, required: false })
    opening_crawl?: string;

    @ApiProperty({ type: String, required: false })
    director?: string;

    @ApiProperty({ type: String, required: false })
    producer?: string;

    @ApiProperty({ type: Date })
    release_date: Date;

    @ApiProperty({ type: [SpeciesDto], required: false })
    species?: SpeciesDto[];

    @ApiProperty({ type: [StarshipDto], required: false })
    starships?: StarshipDto[];

    @ApiProperty({ type: [VehicleDto], required: false })
    vehicles?: VehicleDto[];

    @ApiProperty({ type: [PersonDto], required: false })
    characters?: PersonDto[];

    @ApiProperty({ type: [PlanetDto], required: false })
    planets?: PlanetDto[];

    @ApiProperty({ type: String })
    url: string;

    @ApiProperty({ type: Date })
    created: Date;

    @ApiProperty({ type: Date })
    edited: Date;
}


@ApiExtraModels(FilmNestedDto)
export class FilmDto {
    @ApiProperty({ type: String, description: 'string -- The title of this film', example: 'A New Hope' })
    title: string;

    @ApiProperty({ type: Number, description: 'integer -- The episode number of this film.', example: 4 })
    episode_id: number;

    @ApiProperty({
        type: String,
        required: false,
        description: 'string -- The opening paragraphs at the beginning of this film.',
        example: "It is a period of civil war.\n\nRebel spaceships, striking\n\nfrom a hidden base, have won\n\ntheir first victory against\n\nthe evil Galactic Empire.\n\n\n\nDuring the battle, Rebel\n\nspies managed to steal secret\r\nplans to the Empire's\n\nultimate weapon, the DEATH\n\nSTAR, an armored space\n\nstation with enough power\n\nto destroy an entire planet.\n\n\n\nPursued by the Empire's\n\nsinister agents, Princess\n\nLeia races home aboard her\n\nstarship, custodian of the\n\nstolen plans that can save her\n\npeople and restore\n\nfreedom to the galaxy...."
    })
    opening_crawl?: string;

    @ApiProperty({ type: String, required: false, description: 'string -- The name of the director of this film.', example: 'George Lucas' })
    director?: string;

    @ApiProperty({ type: String, required: false, description: 'string -- The name(s) of the producer(s) of this film. Comma separated.', example: 'Gary Kurtz, Rick McCallum' })
    producer?: string;

    @ApiProperty({ type: Date, description: 'date -- The ISO 8601 date format of film release at original creator country.', example: '1977-05-25' })
    release_date: Date;

    @ApiProperty({ type: [String], required: false, description: 'array -- An array of species resource URLs that are in this film.' })
    species?: string[];

    @ApiProperty({ type: [String], required: false, description: 'array -- An array of starship resource URLs that are in this film.' })
    starships?: string[];

    @ApiProperty({ type: [String], required: false, description: 'array -- An array of vehicle resource URLs that are in this film.' })
    vehicles?: string[];

    @ApiProperty({ type: [String], required: false, description: 'array -- An array of people resource URLs that are in this film.' })
    characters?: string[];

    @ApiProperty({ type: [String], required: false, description: 'array -- An array of planet resource URLs that are in this film.' })
    planets?: string[];

    @ApiProperty({ type: String, description: 'string -- the hypermedia URL of this resource.', example: 'https://swapi.dev/api/films/1/' })
    url: string;

    @ApiProperty({ type: Date, description: 'string -- the ISO 8601 date format of the time that this resource was created.', example: '2014-12-10T14:23:31.880000Z' })
    created: Date;

    @ApiProperty({ type: Date, description: 'string -- the ISO 8601 date format of the time that this resource was edited.', example: '2014-12-12T11:24:39.858000Z' })
    edited: Date;
}
