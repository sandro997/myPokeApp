import axios from "axios";
import { POKE_LIST_ENDPOINT, POKE_CONFIG } from "~api/pokeApi"
import type {GetPokeListProps, PokeApiData} from '~types/pokeTypes'

export async function getPokeList({offset = POKE_CONFIG.OFFSET, limit = POKE_CONFIG.LIMIT, nextEndpoint}:GetPokeListProps) {
    const endpoint = nextEndpoint ? nextEndpoint : POKE_LIST_ENDPOINT (offset, limit) 
    try {
        const response = await axios.get( endpoint,
            { timeout:POKE_CONFIG.TIMEOUT })
        
        const { results, count, next }:PokeApiData = response.data;
        return { results, count, next }
        
    } catch (error) {
        console.error('Errore nel fetch dei Pokémon:')
        return { results: [], count: 0, next: null }
    }
}