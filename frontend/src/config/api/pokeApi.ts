export const POKE_LIST_ENDPOINT = (offset:number = 0, limit:number = 0) => `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
export const POKE_SPRITE_ENDPOINT = (pokemonId:string|undefined) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`



export const POKE_CONFIG = {
    TIMEOUT: 10000,
    RETRY_ATTEMPTS: 3,
    LIMIT: 20,
    OFFSET: 0
}