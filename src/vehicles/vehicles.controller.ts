import { Controller, Param, ParseBoolPipe, Query } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';
import { VehiclesService } from './vehicles.service';
import { VehicleResponseDto, VehiclesResponseDto } from './dto/vehicles-response.dto';
import { VehicleDocsResponses, VehiclesDocsQueries, VehiclesDocsResponses } from './vehicles.docs';

@Controller('vehicles')
export class VehiclesController {
    constructor(private readonly vehiclesService: VehiclesService) {};

    @Get()
    @ApiOperation({ summary: 'Get all vehicles. Records filtered with query params are being seached with "include" and are no case-sensitive.' })
    @VehiclesDocsQueries()
    @VehiclesDocsResponses()
    async getAllVehicles(
        @Query() filters: Record<string, any>
    ):Promise<VehiclesResponseDto> {
        const result = await this.vehiclesService.getAllVehicles(filters);
        return result;
    }
    
    @Get(':id')
    @ApiOperation({ summary: 'Get vehicle with the given id.' })
    @ApiQuery({
        name: 'deep',
        required: false,
        default: false,
        type: Boolean,
        description: 'Allows you to get data with first-level nested properties'
    })
    @VehicleDocsResponses()
    async getVehicleById(
        @Param('id') id: number,
        @Query('deep', new ParseBoolPipe({ optional: true })) deep: boolean = false
    ):Promise<VehicleResponseDto> {
        const result = await this.vehiclesService.getVehicleById(id, !!deep);
        return result;
    }
}
