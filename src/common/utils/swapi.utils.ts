import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class SwapiUtils {
    private readonly swapiBaseUrl = 'https://swapi.dev/api/';
    private readonly swapiTimeout = 60000;

    async fetchAllData(subpage: string, toFetch: string[]): Promise<any> {
        try {
            const url = this.swapiBaseUrl + subpage;
            const res = await axios.get(url, { timeout: this.swapiTimeout });

            if (!res || !res.data) {
                console.error(`SWAPI Utils: Could not fetch ${url}`);
                throw new Error(`SWAPI Utils: Could not fetch ${url}`);
            }

            const data = res.data.results;

            const processedData = await Promise.all(
                data.map(async (obj) => {
                    const updatedObj = { ...obj };

                    for (const property of toFetch) {
                        if (!Array.isArray(obj[property]) || !obj[property].length) continue;

                        updatedObj[property] = await this.fetchMultipleUrls(obj[property]);
                    }

                    return updatedObj;
                })
            );

            return { films: processedData };
        } catch (error) {
            console.error(`SWAPI Utils: ${error}`);
            throw new Error(`SWAPI Utils: ${error}`);
        }
    }

    async fetchMultipleUrls(urls: string[]): Promise<any[]> {
        try {
            if (!urls.length) {
                console.error('SWAPI Utils: No URLs provided');
                throw new Error('SWAPI Utils: No URLs provided');
            }

            const validUrls = urls.filter((url: string) => url.startsWith(this.swapiBaseUrl));
            if (validUrls.length !== urls.length) {
                const invalidUrls = urls.filter((url: string) => !url.startsWith(this.swapiBaseUrl));
                console.error(`SWAPI Utils: Invalid URLs - ${invalidUrls}`);
                throw new Error(`SWAPI Utils: Invalid URLs - ${invalidUrls}`);
            }

            const fetchedData = await Promise.all(
                validUrls.map(async (url) => {
                    try {
                        const res = await axios.get(url, { timeout: this.swapiTimeout });

                        if (!res || !res.data) {
                            console.error(`SWAPI Utils: Could not fetch ${url}`);
                            throw new Error(`SWAPI Utils: Could not fetch ${url}`);
                        }

                        console.log(`SWAPI Utils: Successfully fetched ${url}`);
                        return res.data;
                    } catch (error) {
                        console.error(`SWAPI Utils: Error fetching ${url} - ${error}`);
                        throw new Error(`SWAPI Utils: Error fetching ${url} - ${error}`);
                    }
                })
            );

            return fetchedData;
        } catch (error) {
            console.error(`SWAPI Utils: ${error}`);
            throw new Error(`SWAPI Utils: ${error}`);
        }
    }
}
