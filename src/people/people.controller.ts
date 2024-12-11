import { Controller, Param, ParseBoolPipe, Query } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';
import { PeopleService } from './people.service';
import { PeopleResponseDto, PersonResponseDto } from './dto/people-response.dto';
import { PeopleDocsQueries, PeopleDocsResponses, PersonDocsResponses } from './people.docs';

@Controller('people')
export class PeopleController {
    constructor(private readonly peopleService: PeopleService) {};

    @Get()
    @ApiOperation({ summary: 'Get all people. Records filtered with query params are being seached with "include" and are no case-sensitive.' })
    @PeopleDocsQueries()
    @PeopleDocsResponses()
    async getAllPeople(
        @Query('deep', new ParseBoolPipe({ optional: true })) deep: boolean = false,
        @Query() filters: Record<string, any>
    ):Promise<PeopleResponseDto> {
        const result = await this.peopleService.getAllPeople(!!deep, filters);
        return result;
    }
    
    @Get(':id')
    @ApiOperation({ summary: 'Get person with the given id.' })
    @PeopleDocsQueries()
    @PersonDocsResponses()
    async getPersonById(
        @Param('id') id: number,
        @Query('deep', new ParseBoolPipe({ optional: true })) deep: boolean = false
    ):Promise<PersonResponseDto> {
        const result = await this.peopleService.getPersonById(id, !!deep);
        return result;
    }
}
