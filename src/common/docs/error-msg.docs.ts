import { ApiProperty } from "@nestjs/swagger";

export class NotFoundErrorSchema {
    @ApiProperty({ type: String, example: 'Not Found' })
    error: string;
    @ApiProperty({ type: String, example: 'Could not find the object with the given ID!' })
    message: string;
    @ApiProperty({ type: Number, example: 404 })
    statusCode: 404;
}

export class InternalErrorSchema {
    @ApiProperty({ type: String, example: 'Internal Server Error' })
    error: string;
    @ApiProperty({ type: String, example: 'Something went wrong! Please, try again later.' })
    message: string;
    @ApiProperty({ type: Number, example: 500 })
    statusCode: 500;
}