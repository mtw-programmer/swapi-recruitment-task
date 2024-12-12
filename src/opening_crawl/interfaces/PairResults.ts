export interface PairResults {
    uniqueWordPairs: [string, number][],
    mostFrequentNames: {
        name: string | string[],
        count: number,
    } | {},
}