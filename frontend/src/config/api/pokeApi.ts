import type {I_POKE_CONFIG, TYPE_POKE_LIST_ENDPOINT, TYPE_POKE_SPRITE_ENDPOINT} from '~types/pokeTypes'

export const POKE_LIST_ENDPOINT: TYPE_POKE_LIST_ENDPOINT = (offset, limit) => `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
export const POKE_SPRITE_ENDPOINT: TYPE_POKE_SPRITE_ENDPOINT = (pokemonId) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`

export const POKE_CONFIG: I_POKE_CONFIG = {
    TIMEOUT: 10000,
    RETRY_ATTEMPTS: 3,
    LIMIT: 20,
    OFFSET: 0
}