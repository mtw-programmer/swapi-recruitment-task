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

        if (!words.length) return [];

        const uniquePars = {};
        
        for (let i = 1; i <= words.length - 1; i++) {
            const pair = `${words[i-1]} ${words[i]}`;
            uniquePars[pair] = (uniquePars[pair] || 0) + 1;
        }

        const uniqueWordPairs = Object.entries(uniquePars).map(([pair, count]) => [pair, count]);
        return { uniqueWordPairs };
    }
}
