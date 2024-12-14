export const toFetch = {
    'films': ['characters', 'planets', 'species', 'starships', 'vehicles'],
    'people': ['homeworld', 'films', 'species', 'vehicles', 'starships'],
    'planets': ['residents', 'films'],
    'species': ['homeworld', 'people', 'films'],
    'starships': ['films', 'pilots'],
    'vehicles': ['films', 'pilots']
};