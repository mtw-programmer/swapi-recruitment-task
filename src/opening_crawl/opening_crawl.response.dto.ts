import { ApiProperty } from "@nestjs/swagger";

export class OpeningCrawlResponseDto {
    @ApiProperty({
        example: ['darth vader', 1],
        description: 'Array of string pair and number of their number of occurrences in crawl openings'
    })
    uniqueWordPairs: [string, number][];

    @ApiProperty({
        example: { name: 'Luke', count: 3 },
        description: 'Name with the most occurrencies in crawl openings with number of that occurrencies. If more than 1 name has the same number, name property can be an array.'
    })
    mostFrequentNames: {
        name: string | string[],
        count: number,
    }
}