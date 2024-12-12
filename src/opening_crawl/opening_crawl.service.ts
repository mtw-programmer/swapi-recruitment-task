import { SwapiUtils } from 'src/common/utils/swapi.utils';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OpeningCrawlService {
    constructor(private readonly swapiUtils: SwapiUtils) {}

    async pairUniqueWords() {
        const films = await this.swapiUtils.fetchAllData('films', [], {});
        const { data } = films;
        let openingCrawls = '';

        data.forEach(film => {
            openingCrawls += `${film.opening_crawl} `;
        });

        openingCrawls = openingCrawls.replace(/[.,-?!&;:]/g, '');
        const words = openingCrawls.split(/\s+|\n|\r|\r\n/).filter((word: string) => word !== '');
        return words;
    }
}
