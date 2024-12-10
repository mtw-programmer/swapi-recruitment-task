import { Injectable } from '@nestjs/common';
import { FilmDto } from '../dto/film.dto';
import axios from 'axios';

@Injectable()
export class SwapiUtils {
    private readonly swapiBaseUrl = 'https://swapi.dev/api/';
    private readonly swapiTimeout = 60000;
    private readonly limitPerPage = 5;

    async fetchAllData(subpage: string, toFetch: string[], filters: Record<string, any>): Promise<{ data: any[] }> {
        try {
            const url = this.swapiBaseUrl + subpage;
            const res = await axios.get(url, { timeout: this.swapiTimeout });

            if (!res || !res.data) {
                console.error(`SWAPI Utils: Could not fetch ${url}`);
                throw new Error(`SWAPI Utils: Could not fetch ${url}`);
            }

            console.log(`SWAPI Utils: Successfully fetched ${url}`);

            let data: FilmDto[] = res.data.results;
            const page = parseInt(filters.page);

            if (filters) {
                for (const [key, property] of Object.entries(filters)) {
                    data = data.filter(
                        (film: FilmDto) => {
                            const filmProperty = film[key as keyof typeof film];
                            if (!filmProperty || key == 'page') return true;

                            if (Array.isArray(property)) {
                                return property.some((param) =>
                                    filmProperty.toString().toLowerCase().includes(param.toString().toLowerCase()),
                                );
                            }

                            return filmProperty.toString().toLowerCase().includes(property.toString().toLowerCase());
                        }
                    );
                }
            }

            if (filters.page &&
                typeof page == 'number' &&
                !isNaN(page) &&
                page > 0
            ) {
                const startIndex = (filters.page - 1) * this.limitPerPage;
                const endIndex = startIndex + this.limitPerPage;
                data = data.slice(startIndex, endIndex);
            }

            if (!toFetch.length) return { data };

            let processedData = await Promise.all(
                data.map(async (obj) => {
                    const updatedObj = { ...obj };

                    for (const property of toFetch) {
                        if (!Array.isArray(obj[property]) || !obj[property].length) continue;

                        updatedObj[property] = await this.fetchMultipleUrls(obj[property]);
                    }

                    return updatedObj;
                })
            );

            return { data: processedData };
        } catch (error) {
            console.error(`SWAPI Utils: ${error}`);
            throw new Error(`SWAPI Utils: ${error}`);
        }
    }
    
    async fetchOne(subpage: string, toFetch: string[]): Promise<{ data: any }> {
        try {
            const url = this.swapiBaseUrl + subpage;
            const res = await axios.get(url, { timeout: this.swapiTimeout });

            if (!res || !res.data) {
                console.error(`SWAPI Utils: Could not fetch ${url}`);
                throw new Error(`SWAPI Utils: Could not fetch ${url}`);
            }

            console.log(`SWAPI Utils: Successfully fetched ${url}`);

            if (!toFetch.length) return { data: res.data };

            const updatedObj = { ...res.data };
            
            for (const property of toFetch) {
                if (!Array.isArray(res.data[property]) || !res.data[property].length) continue;

                updatedObj[property] = await this.fetchMultipleUrls(res.data[property]);
            }

            return { data: updatedObj };
        } catch (error) {
            console.error(`SWAPI Utils: ${error}`);
            throw new Error(`SWAPI Utils: ${error}`);
        }
    }

    private async fetchMultipleUrls(urls: string[]): Promise<any[]> {
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
