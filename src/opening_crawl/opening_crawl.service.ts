import { FilmDto } from 'src/common/dto/film.dto';
import { SwapiUtils } from 'src/common/utils/swapi.utils';
import { CacheUtils } from 'src/common/utils/cache.utils';
import { Injectable } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common';
import { PairResults } from './interfaces/PairResults';

@Injectable()
export class OpeningCrawlService {
    constructor(private readonly swapiUtils: SwapiUtils) {}

    private words = [] as string[];
    private names = [] as string[];

    private async fetchOpeningCrawls() {
        try {
            const films = await this.swapiUtils.fetchAllData('films', {});

            if (!films.data || !films.data.length) {
                console.log('fetchOpeningCrawls: Could not fetch any films data');
                return;
            }

            const { data } = films as { data: FilmDto[] };

            let openingCrawls = '';

            data.forEach(film => {
                openingCrawls += `${film.opening_crawl} `;
            });

            openingCrawls = openingCrawls.replace(/[.,-?!&;:]/g, '');
            const words = openingCrawls.split(/\s+|\n|\r|\r\n/).filter((word: string) => word !== '');

            if (!words.length) return;

            this.words = words;
        } catch (error) {
            console.error(`fetchOpeningCrawls: ${error}`);
            throw new InternalServerErrorException('Something went wrong! Please, try again later.');
        }
    }

    private async fetchAllNames() {
        try {
            if (!this.words || !this.words.length) return;

            const people = await this.swapiUtils.fetchAllData('people', {});

            if (!people.data || !people.data.length) return;

            const { data } = people;
            const names = [];

            data.forEach(person => {
                const name = person.name.split(' ')[0];
                names.push(name);
            });

            this.names = names;
        } catch (error) {
            console.error(`fetchAllNames: ${error}`);
            throw new InternalServerErrorException('Something went wrong! Please, try again later.');
        }
    }

    private async pairResults(): Promise<PairResults> {
        try {
            if (!this.words || !this.words.length) 
                return {
                    uniqueWordPairs: [],
                    mostFrequentNames: {}
                };

            const uniquePars = {} as number;
            const nameCount = {} as number;
            
            for (let i = 1; i <= this.words.length; i++) {
                if (this.names.includes(this.words[i-1]))
                    nameCount[this.words[i-1]] = (nameCount[this.words[i-1]] || 0) + 1;

                if (i < this.words.length) {
                    const pair = `${this.words[i-1].toLowerCase()} ${this.words[i].toLowerCase()}`;
                    uniquePars[pair] = (uniquePars[pair] || 0) + 1;
                }
            }

            let maxCount = Math.max(...Object.values(nameCount));
            const names = Object.keys(nameCount).filter(name => nameCount[name] === maxCount);
            let mostFrequentNames = {
                name: names.length === 1 ? names[0] : names,
                count: maxCount
            };

            return {
                uniqueWordPairs: Object.entries(uniquePars).map(([pair, count]) => [pair, count]) as [string, number][],
                mostFrequentNames,
            };
        } catch (error) {
            console.error(`pairResults: ${error}`);
            throw new InternalServerErrorException('Something went wrong! Please, try again later.');
        }
    }

    async getWordsData() {
        try {
            await this.fetchOpeningCrawls();
            await this.fetchAllNames();
            return await this.pairResults();
        } catch (error) {
            console.error(`getWordsData: ${error}`);
            throw new InternalServerErrorException('Something went wrong! Please, try again later.');
        }
    }
}
